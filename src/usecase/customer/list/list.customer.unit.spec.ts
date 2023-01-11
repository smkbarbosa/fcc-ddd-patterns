import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUsecase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress(
    "Customer 1",
    new Address("Street 1", 1, "Zipcode 1", "City 1")
);

const customer2 = CustomerFactory.createWithAddress(
    "Customer 2",
    new Address("Street 2", 2, "Zipcode 2", "City 2")
);

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
    };
};

describe("Unit Test list customer use case", () => {
    it("should list customers", async () => {
        const customerRepository = MockRepository();
        const customerListUseCase = new ListCustomerUsecase(customerRepository);

        const output = await customerListUseCase.execute({});

        expect(output.customers.length).toBe(2);
        expect(output.customers[0].id).toBe(customer1.id);
        expect(output.customers[0].name).toBe(customer1.name);
        expect(output.customers[0].address.street).toBe(customer1.Address.street);
        expect(output.customers[1].id).toBe(customer2.id);
        expect(output.customers[1].name).toBe(customer2.name);
        expect(output.customers[1].address.street).toBe(customer2.Address.street);
    });
});