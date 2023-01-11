// @ts-ignore

import {Sequelize} from "sequelize-typescript";
import CustomerModel from "../../../infraestructure/customer/repository/sequelize/customer.model";
import Address from "../../../domain/customer/value-object/address";
import Customer from "../../../domain/customer/entity/customer";
import CustomerRepository from "../../../infraestructure/customer/repository/sequelize/customer.repository";
import FindCustomerUsecase from "./find.customer.usecase";

const constumer = new Customer("123", "Customer 1");
const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
constumer.changeAddress(address);
const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(constumer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit Test find customer use case", () => {

    it("should find a customer", async () => {

        const customerRepository = MockRepository();
        const usecase = new FindCustomerUsecase(customerRepository);

        const input = {
            id: "123",
        }

        const output = {
            id: "123",
            name: "Customer 1",
            address: {
                street: "Street 1",
                number: 1,
                zip: "Zipcode 1",
                city: "City 1",
            }
        }

        const result = await usecase.execute(input);

        expect(result).toStrictEqual(output);

    });

    it("should throw an error if customer not found", async () => {

            const customerRepository = MockRepository();
            customerRepository.find.mockImplementation(() => {
                throw new Error("Customer not found");
            });
            const usecase = new FindCustomerUsecase(customerRepository);

            const input = {
                id: "123",
            };

            expect(()=>{
                return usecase.execute(input);
            }).rejects.toThrow("Customer not found");
    })


});

