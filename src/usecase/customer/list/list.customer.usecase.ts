import {InputListCustomerDto, OutputListCustomerDto} from "./list.customer.dto";
import Customer from "../../../domain/customer/entity/customer";
import CustomerRepository from "../../../infraestructure/customer/repository/sequelize/customer.repository";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";

export default class ListCustomerUsecase {
    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepository) {
        this.customerRepository = customerRepository;
    }

    async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
        const customers = await this.customerRepository.findAll();
        return OutputMapper.toOutput(customers);
    }
}

class OutputMapper {
    static toOutput(customer: Customer[]): OutputListCustomerDto {
        return {
            // tslint:disable-next-line:no-shadowed-variable
            customers: customer.map((customer) => ({
                id: customer.id,
                name: customer.name,
                address: {
                    street: customer.Address.street,
                    number: customer.Address.number,
                    zip: customer.Address.zip,
                    city: customer.Address.city,
                },
            })),
        };
    }
}