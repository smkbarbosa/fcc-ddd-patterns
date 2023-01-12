import express, {Request, Response} from "express";
import CreateProductUseCase from "../../../../usecase/product/create/createProductUseCase";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import ListProductUseCase from "../../../../usecase/product/list/listProductUseCase";

export const productRoute = express.Router();

productRoute.post('/', async (req: Request, res: Response) => {
    const usecase = new CreateProductUseCase(new ProductRepository());

    try {
        const productDto = {
            type: req.body.type,
            name: req.body.name,
            price: req.body.price,
        }

        const output = await usecase.execute(productDto);
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});

productRoute.get('/', async (req: Request, res: Response) => {
    const usecase = new ListProductUseCase(new ProductRepository());

    try {
        // @ts-ignore
        const output = await usecase.execute({});
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});