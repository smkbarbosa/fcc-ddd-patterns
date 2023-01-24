import Product from "../../../domain/product/entity/product";
import {OutputListProductDto} from "./list.product.dto";

export class OutputMapper {
    static toOutput(product: Product[]): OutputListProductDto {
        return {
            products: product.map((product) => ({
                id: product.id,
                name: product.name,
                price: product.price,
            })),
        }
    }
}