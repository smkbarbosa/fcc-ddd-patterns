import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./listProductUseCase";

const product1 = ProductFactory.create("a", "product A", 1);
const product2 = ProductFactory.create("b", "product B", 1);

const MockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
        find: jest.fn(),
        update: jest.fn(),
    };
}

describe("Unit test for listing product use case", () => {
    it("should list a product", async () => {
        const repository = MockRepository();
        const useCase = new ListProductUseCase(repository);

        // @ts-ignore
        const output = await useCase.execute({});

        expect(output.products.length).toEqual(2);
        expect(output.products[0].id).toEqual(product1.id);
        expect(output.products[0].name).toEqual(product1.name);
        expect(output.products[0].price).toEqual(product1.price);

        expect(output.products[1].id).toEqual(product2.id);
        expect(output.products[1].name).toEqual(product2.name);
        expect(output.products[1].price).toEqual(product2.price);
    });
})