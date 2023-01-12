import express, {Request, Response} from "express";
import CreateCustomerUsecase from "../../../../usecase/customer/create/create.customer.usecase";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import ListCustomerUsecase from "../../../../usecase/customer/list/list.customer.usecase";

export const customerRoute = express.Router();

customerRoute.post("/",
    async (req: Request, res: Response) => {
        const usecase = new CreateCustomerUsecase(new CustomerRepository());
        try {
            const constumerDto = {
                name: req.body.name,
                address: {
                    street: req.body.address.street,
                    city: req.body.address.city,
                    number: req.body.address.number,
                    zip: req.body.address.zip
                },
            }
            const output = await usecase.execute(constumerDto);
            res.send(output);
        } catch (err) {
            res.status(500).send(err);
        }
    });

customerRoute.get("/", async (req: Request, res: Response) => {
    const usecase = new ListCustomerUsecase(new CustomerRepository());
    try {
        const output = await usecase.execute({});
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});