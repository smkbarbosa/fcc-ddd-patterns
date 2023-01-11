import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {OutputListProductDto} from "./list.product.dto";
import Product from "../../../domain/product/entity/product";

export default class ListProductUsecase {
    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    async execute(): Promise<OutputListProductDto> {
        const products = await this.productRepository.findAll();
        // @ts-ignore
        return OutpuMapper.toOutput(products);

        }
    }
class OutpuMapper {
    static toOutput(product: Product[]): { products: { price: number; name: string; id: string }[] }{
        return {
            // tslint:disable-next-line:no-shadowed-variable
            products: product.map(product =>
                ({
                        id: product.id,
                        name: product.name,
                        price: product.price
                    }
                ))
        };
    };
}