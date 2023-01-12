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
});