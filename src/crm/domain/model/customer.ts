import { v4 as uuidv4 } from 'uuid';
import { Money } from "../../../shared/domain/model/money";

/**
 * Represents a customer in the CRM bounded context.
 */
export class Customer {
    private readonly _id: string;
    private readonly _name: string;
    private _lastOrderPrice: Money | null;

    /**
     * Creates a new Customer instance.
     * @param name - The customer's full name.
     * @throws {Error} If the name is empty or whitespace-only.
     */
    constructor(name: string) {
        if (!name || name.trim() === "") {
            throw new Error("Customer name cannot be empty");
        }
        this._id = uuidv4();
        this._name = name.trim();
        this._lastOrderPrice = null;
    }

    /** @public */
    public get id(): string { return this._id; }

    /** @public */
    public get name(): string { return this._name; }

    /** @public */
    public get lastOrderPrice(): Money | null { return this._lastOrderPrice; }

    /** @public */
    public set lastOrderPrice(newLastOrderPrice: Money) {
        this._lastOrderPrice = newLastOrderPrice;
    }
}