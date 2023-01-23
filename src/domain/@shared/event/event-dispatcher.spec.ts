import EventDispatcher from "./event-dispatcher";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EnviaConsoleLog1Handler from "../../customer/event/handler/send-mensage-to-log";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import EnviaConsoleLog2Handler from "../../customer/event/handler/send-mensage-to-log-2";
import Customer from "../../customer/entity/customer";
import Address from "../../customer/value-object/address";
import AddressChangedEvent from "../../customer/event/address-changed.event";
import EnviaConsoleLog3Handler from "../../customer/event/handler/send-mensage-to-log-3";

describe("Domain events tests", () => {
    it("should register an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers.ProductCreatedEvent
        ).toBeDefined();
        expect(eventDispatcher.getEventHandlers.ProductCreatedEvent.length).toBe(1);
        expect(eventDispatcher.getEventHandlers.ProductCreatedEvent[0]).toMatchObject(eventHandler);
    });

    it("should unregister an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers.ProductCreatedEvent[0]
        ).toMatchObject(eventHandler);

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers.ProductCreatedEvent
        ).toBeDefined();
        expect(eventDispatcher.getEventHandlers.ProductCreatedEvent.length).toBe(
            0
        );
    });

    it("should unregister all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers.ProductCreatedEvent[0]
        ).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();

        expect(
            eventDispatcher.getEventHandlers.ProductCreatedEvent
        ).toBeUndefined();

    });

    it("should notify an event", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers.ProductCreatedEvent[0]
        ).toMatchObject(eventHandler);

        const productCreatedEvent = new ProductCreatedEvent({
                name: "P1 Name",
                description: "Product description",
                price: 100,
            }
        );

        // Quando o notify for executado, o SendEmailWhenProductIsCreatedHandler() vai ser chamado

        eventDispatcher.notify(productCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    });

    it("should notify an customer created event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new EnviaConsoleLog1Handler();
        const eventHandler2 = new EnviaConsoleLog2Handler();
        const spyEventHandler = jest.spyOn(eventHandler1, "handle");
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        expect(eventDispatcher.getEventHandlers.CustomerCreatedEvent[0]
        ).toMatchObject(eventHandler1);
        expect(eventDispatcher.getEventHandlers.CustomerCreatedEvent[1]
        ).toMatchObject(eventHandler2);

        const customerCreatedEvent = new CustomerCreatedEvent({
            name: "Customer Name",
        });

        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();
    });

    it("should notify when address is changed", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLog3Handler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("AddressChangedEvent", eventHandler);

        const customer = new Customer("1", "Customer Name");
        const address = new Address("Street", 1, "CEP", "Cidade");
        customer.Address = address;

        expect(eventDispatcher.getEventHandlers.AddressChangedEvent[0]
        ).toMatchObject(eventHandler);

        const address2 = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address2);

        const addressChangedEvent = new AddressChangedEvent({
            id: customer.id,
            name: customer.name,
            address: customer.Address
        });

        eventDispatcher.notify(addressChangedEvent);
        expect(spyEventHandler).toHaveBeenCalled();
    });

});