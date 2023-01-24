import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./updateProductUseCase";

const product = ProductFactory.create(
    "a",
    "product name",
    1
);

const input = {
    id: product.id,
    name: "Product updated name",
    price: 100
};

const MockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        update: jest.fn(),
    };
};

describe("Unit Test update product use case", () => {
    it("should update product", async () => {
        const productRepository = MockRepository();
        const updateProductUseCase = new UpdateProductUseCase(productRepository);

        const output = await updateProductUseCase.execute(input);

        expect(output).toEqual(input);
    });
});

