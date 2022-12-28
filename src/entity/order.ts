import OrderItem from "./order_item";

export default class Order {   

    private _id: string;
    private _customerId: string; //Se a relação for de agregados diferentes, utiliza o ID
    private _items: OrderItem[] = []; // Se a relação for dentro do mesmo agregado, usa a classe
    private _total: number;

    constructor(id: string, customerId: string, items: OrderItem[]) {
        this._id = id;
        this._customerId = customerId;
        this._items = items;
        this._total = this.total();
        this.validate();
    }

    total(): number {
        return this._items.reduce((total, item) => total + item._price, 0);
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
        return true;

    }
}