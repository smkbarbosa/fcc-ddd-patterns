import Product from "../../../domain/product/entity/product";

export class OutputMapper {
    static toOutput(product: Product[]): { products: { price: number; name: string; id: string }[] }{
        return {
            // tslint:disable-next-line:no-shadowed-variable
            products: product.map(product =>
                ({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        type: 'a',
                    }
                ))
        };
    };
}