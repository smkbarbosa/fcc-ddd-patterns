import Product from "./product";

describe("Product unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            let product = new Product("", "Product 1", 100)
        }).toThrowError("product: Product id is required");

    });

    it("should throw error when name is empty", () => {
        expect(() => {
            let product = new Product("1", "", 100)
        }).toThrowError("product: Product name is required");
    });

    it("should throw error when price is less then zero", () => {
        expect(() => {
            let product = new Product("1", "p1", -1)
        }).toThrowError("product: Product price must be greater than zero");
    });

    it("should throw error whenname no exists and id is blank", () => {

        expect(() => {
            let product = new Product("", "", 10)// @ts-ignore
        }).toThrowError("product: Product id is required", "product: Product name is required");
    });

    it("should change name", () => {
        const product = new Product("1", "p1", 100)
        product.changeName("Product 1");
        expect(product.name).toBe("Product 1");

    });

    it("should change price", () => {
        const product = new Product("1", "p1", 100)
        product.changePrice(150);
        expect(product.price).toBe(150);

    });


});