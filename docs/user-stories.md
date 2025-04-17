# User Stories

The following user stories describe main features of the CRM & Sales Order Management console script.

## US001: Creating a Sales Order
As a sales manager, I want to create a sales order for a customer so that I can track their purchase.

### Acceptance Criteria
- **Scenario: Create a new sales order with default state**
    - **Given** a customer exists with a valid ID,
    - **When** a sales manager creates a new sales order with the customer's ID and a currency,
    - **Then** the sales order is created with a unique ID, the customer's ID, the specified currency, and a state of "PENDING".

## US002: Adding Items to a Sales Order
As a sales manager, I want to add items to a sales order so that I can specify what the customer is purchasing.

### Acceptance Criteria
- **Scenario: Add items to a pending sales order**
    - **Given** a sales order exists with a state of "PENDING",
    - **When** a sales manager adds an item with a product ID, quantity, and unit price,
    - **Then** the item is added to the sales order with a unique item ID, and the total price can be calculated.
- **Scenario: Attempt to add items to a shipped sales order**
    - **Given** a sales order exists with a state of "SHIPPED",
    - **When** a sales manager attempts to add an item,
    - **Then** an error is thrown indicating that items cannot be added to a "SHIPPED" order.

## US003: Confirming a Sales Order
As a sales manager, I want to confirm a sales order so that it can be prepared for shipment.

### Acceptance Criteria
- **Scenario: Confirm a pending sales order**
    - **Given** a sales order exists with a state of "PENDING",
    - **When** a sales manager confirms the sales order,
    - **Then** the sales order’s state changes to "CONFIRMED".
- **Scenario: Attempt to confirm a shipped sales order**
    - **Given** a sales order exists with a state of "SHIPPED",
    - **When** a sales manager attempts to confirm the sales order,
    - **Then** an error is thrown indicating that an order that is "SHIPPED" cannot be confirmed.

## US004: Shipping a Sales Order
As a warehouse manager, I want to ship a confirmed sales order so that it can be delivered to the customer.

### Acceptance Criteria
- **Scenario: Ship a confirmed sales order**
    - **Given** a sales order exists with a state of "CONFIRMED",
    - **When** a warehouse manager ships the sales order,
    - **Then** the sales order’s state changes to "SHIPPED".
- **Scenario: Attempt to ship a pending sales order**
    - **Given** a sales order exists with a state of "PENDING",
    - **When** a warehouse manager attempts to ship the sales order,
    - **Then** an error is thrown indicating that an order that is "PENDING" cannot be shipped.

## US005: Cancelling a Sales Order
As a sales manager, I want to cancel a sales order so that it can be voided if necessary.

### Acceptance Criteria
- **Scenario: Cancel a pending sales order**
    - **Given** a sales order exists with a state of "PENDING",
    - **When** a sales manager cancels the sales order,
    - **Then** the sales order’s state changes to "CANCELLED".
- **Scenario: Cancel a confirmed sales order**
    - **Given** a sales order exists with a state of "CONFIRMED",
    - **When** a sales manager cancels the sales order,
    - **Then** the sales order’s state changes to "CANCELLED".
- **Scenario: Attempt to cancel a shipped sales order**
    - **Given** a sales order exists with a state of "SHIPPED",
    - **When** a sales manager attempts to cancel the sales order,
    - **Then** an error is thrown indicating that an order that is "SHIPPED" cannot be cancelled.

## US006: Calculating the Total Price of a Sales Order
As a sales manager, I want to calculate the total price of a sales order so that I can inform the customer of the cost.

### Acceptance Criteria
- **Scenario: Calculate total price with multiple items**
    - **Given** a sales order exists with two items, one with a unit price of $100 and quantity 2, another with a unit price of $50 and quantity 20,
    - **When** a sales manager calculates the total price,
    - **Then** the total price is $1,200 in the specified currency.