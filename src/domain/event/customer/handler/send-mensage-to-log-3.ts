import EventHandlerInterface from "../../@shared/event-handler.interface";
import AddressChangedEvent from "../address-changed.event";

export default class EnviaConsoleLog3Handler implements EventHandlerInterface<AddressChangedEvent> {
    handle(event: AddressChangedEvent): void {
        // tslint:disable-next-line:no-console
        console.log(`Endereço do cliente ${event.eventData.id} - ${event.eventData.name} alterado para: ${event.eventData.address}`);
    }
}