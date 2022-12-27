import OrderItem from "./order_item";

export default class Order {   

    _id: string;
    _customerId: string; //Se a relação for de agregados diferentes, utiliza o ID
    _items: OrderItem[] = []; // Se a relação for dentro do mesmo agregado, usa a classe

    constructor(id: string, customerId: string, items: OrderItem[]) {
        this._id = id;
        this._customerId = customerId;
        this._items = items;
    }
}