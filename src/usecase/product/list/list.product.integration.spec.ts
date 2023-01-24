import {Sequelize} from "sequelize-typescript";
import ProductModel from "../../../infraestructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infraestructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./listProductUseCase";
import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";

describe("Test list product use case", () => {
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

    it("should list products", async () => {
        const product1 = new Product("1", "product A", 1);
        const product2 = new Product( "2", "product B", 1);
        const productRepository = new ProductRepository();
        const useCase = new ListProductUseCase(productRepository)

        await productRepository.create(product1);
        await productRepository.create(product2);

        const result = await useCase.execute({});

        expect(result.products.length).toBe(2);
        expect(result.products[0]).toEqual({
            id: product1.id,
            name: product1.name,
            price: product1.price,
        });
        expect(result.products[1]).toEqual({
            id: product2.id,
            name: product2.name,
            price: product2.price,
        });

    });


});