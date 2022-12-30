import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            let order = new Order("", "123", [])
        }).toThrowError("Id is required");

    });

    it("should throw error when customerid is empty", () => {
        expect(() => {
            let order = new Order("123", "", [])
        }).toThrowError("CustomerId is required");

    });

    it("should throw error when item is empty", () => {
        expect(() => {
            let order = new Order("123", "123", [])
        }).toThrowError("Item qtt must be greater than 0");

    });

    it("should calculate total", () => {
            
            const item1 = new OrderItem('i1', 'Item1', 100, 'p1', 2);
            const item2 = new OrderItem('i2', 'Item2', 200, 'p2', 2);

            const order = new Order('1','123' , [item1]);

            let total = order.total();

            expect(order.total()).toBe(200);

            const order2 = new Order('1','123' , [item1, item2]);
            total = order2.total();

            expect(total).toBe(600);
    });

    it("should check if the qtt is greater than 0", () => {
            
        expect(() => {
            const item1 = new OrderItem('i1', 'Item1', 100, 'p1', 0);
            const order = new Order('1','123' , [item1]);
        }).toThrowError("Item qtt must be greater than 0");

});


});