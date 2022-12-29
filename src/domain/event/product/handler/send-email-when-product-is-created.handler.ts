import EventHandlerInterface from "../../@shared/event-handler.interface";
import ProductCreatedEvent from "../product-created.event";

export default class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface<ProductCreatedEvent> {
    handle(event: ProductCreatedEvent): void {
        // tslint:disable-next-line:no-console
        console.log(`Send email to ${event.eventData.email} with product ${event.eventData.productName} created`);
    }
}