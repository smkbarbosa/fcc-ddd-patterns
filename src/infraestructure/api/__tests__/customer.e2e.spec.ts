import {app, sequelize} from "../express";
import request from "supertest";

/* Instalado nesse passo o supertest (npm i -D supertest para realizar esse tipo de teste */
describe("E2E test for customer", () => {
    beforeEach(async () => {
        await sequelize.sync({force: true});
    });

    afterAll(async () => {
        await sequelize.close();
    });


    it("should create a customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "John Doe",
                address: {
                    street: "Street 1",
                    city: "City 1",
                    number: 123,
                    zip: "12345",
                }
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("John Doe");
        expect(response.body.address.street).toBe("Street 1");
        expect(response.body.address.city).toBe("City 1");
        expect(response.body.address.number).toBe(123);

    });

    it("should return 500 when name is not provided", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "jonh",
            });

        expect(response.status).toBe(500);
    });

    it("should list all customers", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "John Doe",
                address: {
                    street: "Street 1",
                    city: "City 1",
                    number: 123,
                    zip: "12345",
                }
            });
        expect(response.status).toBe(200);

        const response2 = await request(app)
            .post("/customer")
            .send({
                name: "Jane",
                address: {
                    street: "Street 2",
                    city: "City 2",
                    number: 456,
                    zip: "67890",

                }
            });
        expect(response2.status).toBe(200);

        const listResponse = await request(app).get("/customer").send();

        expect(listResponse.status).toBe(200);
        expect(listResponse.body.customers.length).toBe(2);
        const customer = listResponse.body.customers[0];
        expect(customer.name).toBe("John Doe");
        expect(customer.address.street).toBe("Street 1");
        const customer2 = listResponse.body.customers[1];
        expect(customer2.name).toBe("Jane");
        expect(customer2.address.street).toBe("Street 2");
    });
});