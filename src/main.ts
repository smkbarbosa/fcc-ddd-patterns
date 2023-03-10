import Address from "./domain/customer/value-object/address";
import Customer from "./domain/customer/entity/customer";
import Order from "./domain/checkout/entity/order";
import OrderItem from "./domain/checkout/entity/order_item";

let customer = new Customer('123', 'Samuel Barbosa');
const address = new Address('rua 1', 123, "12345-678", 'SP');

customer.Address = address;
customer.activate();

const item1 = new OrderItem('123', 'Item1', 10, 'p1', 2);
const item2 = new OrderItem('456', 'Item2', 20, 'p2', 2);

const order = new Order('1','123' , [item1, item2]);