import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUsecase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
    "Customer 1",
    new Address("Street 1", 1, "Zipcode 1", "City 1")
);

const input = {
    id: customer.id,
    name: "Customer updated",
    address: {
        street: "Street updated",
        number: 2,
        zip: "Zipcode updated",
        city: "City updated",
    },
};

const MockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        update: jest.fn(),
    };
};

describe("Unit Test update customer use case", () => {
    it("should update a customer", async () => {
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new UpdateCustomerUsecase(customerRepository);

        const output = await customerUpdateUseCase.execute(input);

        expect(output).toEqual(input);
    });
});