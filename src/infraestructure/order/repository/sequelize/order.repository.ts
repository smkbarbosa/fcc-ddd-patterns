import Order from "../../../../domain/checkout/entity/order";
import OrderModel from "./order.model";
import OrderItemModel from "./order-item.model";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItem from "../../../../domain/checkout/entity/order_item";

export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<void> {
        await OrderModel.create(
            {
                id: entity.id,
                customerId: entity.customerId,
                total: entity.total(),
                items: entity.items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    productId: item.productId,
                    quantity: item.quantity,
                })),
            },
            {
                include: [{model: OrderItemModel}],
            }
        );
    }

    async update(entity: Order): Promise<void> {
        entity.items.map((item) => {
            OrderItemModel.upsert({
                id: item.id,
                name: item.name,
                price: item.price,
                productId: item.productId,
                quantity: item.quantity,
                orderId: entity.id
            });
        });
        await OrderModel.update(
            {
                total: entity.total(),
            },
            {
                where: {id: entity.id},
            }
        );
    }

    async find(id: string): Promise<Order> {
        const orderModel = await OrderModel.findOne({
            where: {id},
            include: ["items"]
        });
        return new Order(
            orderModel.id,
            orderModel.customerId,
            orderModel.items.map((orderItem) =>
                new OrderItem(
                    orderItem.id,
                    orderItem.name,
                    orderItem.price,
                    orderItem.productId,
                    orderItem.quantity
                )
            ));
    }

    async findAll(): Promise<Order[]> {
        const orderModels = await OrderModel.findAll({
            include: ["items"]
        });
        return orderModels.map((orderModel) => new Order(
            orderModel.id,
            orderModel.customerId,
            orderModel.items.map((orderItem) =>
                new OrderItem(
                    orderItem.id,
                    orderItem.name,
                    orderItem.price,
                    orderItem.productId,
                    orderItem.quantity
                )
            )
        ));
    }
}
