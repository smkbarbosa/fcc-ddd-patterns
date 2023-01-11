import Product from "../../../domain/product/entity/product";
import FindProductUsecase from "./find.product.usecase";

const product = new Product("123", "Product 1", 10);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
}

describe("Unit Test find product use case", () => {
    it("should find product", async () => {
        const productRepository = MockRepository();
        const useCase = new FindProductUsecase(productRepository);

        const input = {
            id: '123',
        };

        const output = {
            id: '123',
            name: 'Product 1',
            price: 10
        }

        const result = await useCase.execute(input);

        expect(result).toEqual(output);
    });

});