import CreateProductUseCase from "./createProductUseCase";

const input = {
    type: "a",
    name: 'Product 1',
    price: 10
};

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
}

describe('Unit Test create product use case', () => {
    it('should create product', async () => {
        const productRepository = MockRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);

        const output = await createProductUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price,
        });
    });

    it('should throw error when price is less then zero', async () => {
        const productRepository = MockRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);
        input.price = -1;

        await expect(createProductUseCase.execute(input)).rejects.toThrowError("product: Product price must be greater than zero");
    });
});