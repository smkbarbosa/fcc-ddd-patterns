import {Sequelize} from "sequelize-typescript";
import ProductModel from "../../../infraestructure/product/repository/sequelize/product.model";
import UpdateProductUseCase from "./updateProductUseCase";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infraestructure/product/repository/sequelize/product.repository";

describe("Test update product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true},
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should update product", async () => {
        const product1 = new Product("1", "product A", 1);
        const productRepository = new ProductRepository();
        const useCase = new UpdateProductUseCase(productRepository)

        await productRepository.create(product1);

        const update = {
            id: product1.id,
            name: "product updated",
            price: 20
        }

        const result = await useCase.execute(update);

        const output = {
            id: "1",
            name: "product updated",
            price: 20
        }

        expect(result.id).toEqual(output.id);
        expect(result.name).toEqual(output.name);
        expect(result.price).toEqual(output.price);
    });
});