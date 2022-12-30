import OrderItem from "./order_item";

export default class Order {

    private _id: string;
    private _customerId: string; // Se a relação for de agregados diferentes, utiliza o ID
    private _items: OrderItem[] = []; // Se a relação for dentro do mesmo agregado, usa a classe
    private _total: number;

    constructor(id: string, customerId: string, items: OrderItem[]) {
        this._id = id;
        this._customerId = customerId;
        this._items = items;
        this._total = this.total();
        this.validate();
    }

    get id(): string {
        return this._id;
    }

    get customerId(): string {
        return this._customerId;
    }

    get items(): OrderItem[] {
        return this._items;
    }

    total(): number {
        return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
    }

    changeItems(item: OrderItem[]) {
        this._items = item;
        this._total = this.total();
        this.validate()
    }
    validate(): boolean {
        if (this._id.length === 0) {
            throw new Error("Id is required");
        }
        if (this._customerId.length === 0) {
            throw new Error("CustomerId is required");
        }
        if (this._items.length === 0) {
            throw new Error("Item qtt must be greater than 0");
        }
        if (this._items.some((item) => item.quantity <= 0)) {
            throw new Error("Item qtt must be greater than 0");
        }
        return true;

    }
}