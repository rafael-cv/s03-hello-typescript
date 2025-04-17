# s03-hello-typescript

This is a console application illustrating TypeScript-based CRM and Sales concepts with Object-Oriented Programming and Domain-Driven Design (DDD) principles.

## Object-Oriented and Domain-Driven Design Principles and Concepts
The project employs several Object-Oriented Programming and Domain-Driven Design principles and concepts:
- **Encapsulation**: The `SalesOrder` aggregate root encapsulates its state and items, exposing intent-revealing methods (`addItem`, `confirm`, `ship`, `cancel`) while hiding implementation details like the `_items` array and `_state`.
- **Single Responsibility**: Each class has a clear purpose—e.g., `SalesOrder` manages the order lifecycle, `SalesOrderItem` handles item-specific calculations, `Money` performs monetary operations, and `DateTime` manages date validation and formatting.
- **Immutability**: Fields like `_id`, `_customerId`, and `_orderedAt` are readonly, ensuring key aspects of the domain model remain consistent after creation.
- **Bounded Contexts**: The project is split into `crm` (customer management), `sales` (order management), and `shared` (reusable types), isolating domain logic and reducing coupling.
- **Aggregate Root**: `SalesOrder` encapsulates its state and behavior, ensuring all business rules (e.g., state transitions, item addition constraints) are enforced within the domain model.
- **Ubiquitous Language**: Terms like "confirm," "ship," "cancel," and "ordered at" reflect the business domain, used consistently in code and documentation (e.g., `user-stories.md`).
- **Invariants**: `SalesOrder` enforces rules like no future order dates (via `DateTime`), non-empty customer IDs, and valid state transitions, protecting the domain’s consistency.

## TypeScript Features
- **Union Types**: `SalesOrderState` is defined as `"PENDING" | "CONFIRMED" | "SHIPPED" | "CANCELLED"`, ensuring type-safe state transitions at compile time.
- **Literal Type Assertions**: The `as const` assertion (e.g., `"USD" as const`) narrows currency codes to literal types, enhancing type inference.
- **Template Literal Types**: `CurrencyCode` is defined as a three-letter uppercase string (e.g., `"USD"`, `"PEN"`), enforcing ISO 4217 compliance at the type level.

## User Stories
The document [docs/user-stories.md](docs/user-stories.md) contains the user stories for the key functionalities of the application.

## Class Diagram
The following class diagram illustrates the relationships between the main classes in the system:

![class-diagram](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/upc-pre-202510-1asi0729-sandbox/typescript-review/refs/heads/master/docs/class-diagram.puml?token=GHSAT0AAAAAAC7JG2V4ZNR5J47AQFM3MFVYZ7YLC6A)

## License
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
