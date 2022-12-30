import EventDispatcher from "./event-dispatcher";
import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../product/product-created.event";

class SendEmailWherProductIsCreatedHandler {
}

describe("Domain events tests", () => {
    it("should register an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWherProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]
        ).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    });

    it("should unregister an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
        ).toMatchObject(eventHandler);

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"]
        ).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
            0
        );
    });

    it("should unregister all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
        ).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();

        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"]
        ).toBeUndefined();

    });

    it("should notify an event",() => {
            const eventDispatcher = new EventDispatcher();
            const eventHandler = new SendEmailWhenProductIsCreatedHandler();
            const spyEventHandler = jest.spyOn(eventHandler, "handle");

            eventDispatcher.register("ProductCreatedEvent", eventHandler);

            expect(
                eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
            ).toMatchObject(eventHandler);

            const productCreatedEvent = new ProductCreatedEvent({
                    name: "Product name",
                    description: "Product description",
                    price: 100,
                }
            );

            // Quando o notify for executado, o SendEmailWhenProductIsCreatedHandler() vai ser chamado
            // @ts-ignore
            eventDispatcher.notify("productCreatedEvent");

            expect(spyEventHandler).toHaveBeenCalled();
        });

});