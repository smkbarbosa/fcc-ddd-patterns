import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {InputCreateProductDto, OutputCreateProductDto} from "./create.product.dto";
import ProductFactory from "../../../domain/product/factory/product.factory";

export default class CreateProductUsecase {
    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    async execute(
        input: InputCreateProductDto): Promise<OutputCreateProductDto> {
        const product = ProductFactory.create(input.type, input.name, input.price);

        // @ts-ignore
        await this.productRepository.create(product);

        return {
            id: product.id,
            price: product.price,
            name: product.name
        }
    };

}