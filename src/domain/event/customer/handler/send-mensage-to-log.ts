import CustomerCreatedEvent from "../customer-created.event";
import EventHandlerInterface from "../../@shared/event-handler.interface";

export default class EnviaConsoleLog1Handler implements EventHandlerInterface<CustomerCreatedEvent> {
    handle(event: CustomerCreatedEvent): void {
        // tslint:disable-next-line:no-console
        console.log("Esse é o primeiro console.log do evento: CustomerCreated");
    }
    handle1(event: CustomerCreatedEvent):void {
        // tslint:disable-next-line:no-console
        console.log("Esse é o segundo console.log do evento: CustomerCreated");
    }
}