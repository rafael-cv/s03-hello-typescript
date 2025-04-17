import { v4 as uuidv4 } from 'uuid';
import { Money } from "../../../shared/domain/model/money";

/**
 * Represents an item within a sales order in the Sales bounded context.
 */
export class SalesOrderItem {
    private readonly _orderId: string;
    private readonly _itemId: string;
    private readonly _productId: string;
    private readonly _quantity: number;
    private readonly _unitPrice: Money;

    /**
     * Creates a new SalesOrderItem instance.
     * @param orderId - The ID of the sales order this item belongs to.
     * @param productId - The ID of the product being ordered.
     * @param quantity - The number of units ordered.
     * @param unitPrice - The price per unit.
     */
    constructor(orderId: string, productId: string, quantity: number, unitPrice: Money) {
        this._itemId = uuidv4();
        this._orderId = orderId;
        this._productId = productId;
        this._quantity = quantity;
        this._unitPrice = unitPrice;
    }

    /**
     * Calculates the total price for this item (quantity * unit price).
     * @public
     * @returns The total price of the item.
     */
    public calculateItemPrice = (): Money => this._unitPrice.multiply(this._quantity);

    /** @public */
    public get productId(): string { return this._productId; }

    /** @public */
    public get quantity(): number { return this._quantity; }

    /** @public */
    public get unitPrice(): Money { return this._unitPrice; }
}