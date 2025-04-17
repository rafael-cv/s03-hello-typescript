import { v4 as uuidv4 } from 'uuid';
import { SalesOrderItem } from "./sales-order-item";
import { Money } from "../../../shared/domain/model/money";
import { Currency } from "../../../shared/domain/model/currency";
import { DateTime } from "../../../shared/domain/model/date-time";

/**
 * Type representing the valid states of a sales order.
 */
export type SalesOrderState = "PENDING" | "CONFIRMED" | "SHIPPED" | "CANCELLED";

/**
 * Represents a sales order aggregate root in the Sales bounded context, managing its own state transitions.
 */
export class SalesOrder {
    private readonly _customerId: string;
    private readonly _id: string;
    private readonly _items: SalesOrderItem[];
    private readonly _orderedAt: DateTime;
    private readonly _currency: Currency;
    private _state: SalesOrderState;

    /**
     * Creates a new SalesOrder instance with an initial PENDING state.
     * @param customerId - The ID of the customer placing the order.
     * @param currency - The currency for the order's monetary values.
     * @param orderedAt - The date the order was placed (defaults to now if not provided).
     * @throws {Error} If customerId is empty or orderedAt is invalid/future.
     */
    constructor(customerId: string, currency: Currency, orderedAt?: Date | string) {
        if (!customerId || customerId.trim() === "") {
            throw new Error("Customer ID cannot be empty");
        }
        this._id = uuidv4();
        this._customerId = customerId.trim();
        this._currency = currency;
        this._items = [];
        this._orderedAt = new DateTime(orderedAt); // Validation happens here
        this._state = "PENDING";
    }

    /** @public */
    public get id(): string { return this._id; }

    /** @public */
    public get customerId(): string { return this._customerId; }

    /** @public */
    public get orderedAt(): DateTime { return this._orderedAt; }

    /** @public */
    public get currency(): Currency { return this._currency; }

    /** @public */
    public get state(): SalesOrderState { return this._state; }

    /**
     * Adds an item to the sales order if the current state allows it.
     * @public
     * @param productId - The ID of the product being ordered.
     * @param quantity - The number of units ordered.
     * @param unitPriceAmount - The price per unit.
     * @throws {Error} If productId is empty, quantity is non-positive, or state disallows adding items.
     */
    public addItem(productId: string, quantity: number, unitPriceAmount: number): void {
        if (!productId || productId.trim() === "") {
            throw new Error("Product ID cannot be empty");
        }
        if (quantity <= 0) {
            throw new Error("Quantity must be greater than zero");
        }
        if (!this.canAddItems()) {
            throw new Error(`Cannot add items to a ${this._state} order`);
        }
        const unitPrice = new Money(unitPriceAmount, this._currency);
        const item = new SalesOrderItem(this._id, productId.trim(), quantity, unitPrice);
        this._items.push(item);
    }

    /**
     * Calculates the total price of all items in the order.
     * @public
     * @returns The total price in the order's currency.
     */
    public calculateTotalPrice(): Money {
        return this._items.reduce(
            (total, item) => total.add(item.calculateItemPrice()),
            new Money(0, this._currency)
        );
    }

    /**
     * Formats the order date as a human-readable string.
     * @public
     * @returns The formatted date (e.g., "April 9, 2025, 10:30 AM PDT").
     */
    public getFormattedOrderedAt(): string {
        return this._orderedAt.format();
    }

    /**
     * Confirms the sales order, transitioning it to CONFIRMED if allowed.
     * @public
     * @throws {Error} If the current state does not allow confirmation.
     */
    public confirm(): void {
        if (this._state === "PENDING") {
            this._state = "CONFIRMED";
        } else {
            throw new Error(`Cannot confirm an order that is ${this._state}`);
        }
    }

    /**
     * Ships the sales order, transitioning it to SHIPPED if allowed.
     * @public
     * @throws {Error} If the current state does not allow shipping.
     */
    public ship(): void {
        if (this._state === "CONFIRMED") {
            this._state = "SHIPPED";
        } else {
            throw new Error(`Cannot ship an order that is ${this._state}`);
        }
    }

    /**
     * Cancels the sales order, transitioning it to CANCELLED if allowed.
     * @public
     * @throws {Error} If the current state does not allow cancellation.
     */
    public cancel(): void {
        if (this._state === "SHIPPED" || this._state === "CANCELLED") {
            throw new Error(`Cannot cancel an order that is ${this._state}`);
        }
        this._state = "CANCELLED";
    }

    /**
     * Checks if items can be added based on the current state.
     * @private
     * @returns True if items can be added, false otherwise.
     */
    private canAddItems(): boolean {
        return this._state !== "CANCELLED" && this._state !== "SHIPPED";
    }
}