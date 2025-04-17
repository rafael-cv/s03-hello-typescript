import { Currency } from "./currency";

/**
 * Represents a monetary amount with a specific currency in the Shared bounded context.
 */
export class Money {
    private readonly _amount: number;
    private readonly _currency: Currency;

    /**
     * Creates a new Money instance.
     * @param amount - The monetary amount (must be non-negative).
     * @param currency - The currency of the amount.
     * @throws {Error} If the amount is negative.
     */
    constructor(amount: number, currency: Currency) {
        if (amount < 0) {
            throw new Error("Amount cannot be negative");
        }
        this._amount = amount;
        this._currency = currency;
    }

    /** @public */
    public get amount(): number { return this._amount; }

    /** @public */
    public get currency(): Currency { return this._currency; }

    /**
     * Converts the money to a string representation.
     * @public
     * @returns The amount and currency code (e.g., "USD 123.45").
     */
    public toString = (): string => `${this._currency.code} ${this._amount.toFixed(2)}`;

    /**
     * Formats the money amount for a given locale.
     * @public
     * @param locale - The locale for formatting (defaults to "en-US").
     * @returns The formatted amount (e.g., "$123.45").
     */
    public format = (locale: string = "en-US"): string => this._currency.formatAmount(this._amount, locale);

    /**
     * Adds another Money instance to this one.
     * @public
     * @param other - The Money to add.
     * @returns A new Money instance with the sum.
     * @throws {Error} If currencies do not match.
     */
    public add = (other: Money): Money => {
        if (this._currency.code !== other.currency.code) {
            throw new Error("Cannot add Money with different currencies");
        }
        return new Money(this._amount + other.amount, this._currency);
    };

    /**
     * Multiplies the amount by a factor.
     * @public
     * @param factor - The multiplication factor (must be non-negative).
     * @returns A new Money instance with the multiplied amount.
     * @throws {Error} If factor is negative.
     */
    public multiply = (factor: number): Money => {
        if (factor < 0) {
            throw new Error("Cannot multiply Money by a negative factor");
        }
        return new Money(this._amount * factor, this._currency);
    };
}