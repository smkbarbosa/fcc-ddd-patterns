import Address from "./entity/address";
import Customer from "./entity/customer";
import Order from "./entity/order";
import OrderItem from "./entity/order_item";

let customer = new Customer('123', 'Samuel Barbosa');
const address = new Address('rua 1', 123, 'São Paulo', 'SP', '12345-678');

customer._address = address;
customer.activate();

const item1 = new OrderItem('123', 'Item1', 10);
const item2 = new OrderItem('456', 'Item2', 20);

const order = new Order('1','123' , [item1, item2]);