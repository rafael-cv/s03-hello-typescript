type UppercaseLetter = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z";
/**
 * Type representing a 3-letter ISO 4217 currency code (e.g., "USD", "PEN").
 */
export type CurrencyCode = `${UppercaseLetter}${UppercaseLetter}${UppercaseLetter}`;

/**
 * Represents a currency in the Shared bounded context.
 */
export class Currency {
    private readonly _code: CurrencyCode;

    /**
     * Creates a new Currency instance.
     * @param code - The 3-letter ISO 4217 currency code.
     */
    constructor(code: CurrencyCode) {
        this._code = code;
    }

    /** @public */
    public get code(): string { return this._code; }

    /**
     * Formats an amount in this currency for a given locale.
     * @public
     * @param amount - The amount to format.
     * @param locale - The locale for formatting (defaults to "en-US").
     * @returns The formatted amount (e.g., "$1,234.56" or "S/1,234.56").
     */
    public formatAmount = (amount: number, locale: string = "en-US"): string => {
        return amount.toLocaleString(locale, {
            style: "currency",
            currency: this._code,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    /**
     * Converts the currency to a string representation.
     * @public
     * @returns The currency code.
     */
    public toString = (): string => this._code;
}