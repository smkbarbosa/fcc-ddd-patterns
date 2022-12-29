import EventInterface from "./event.interface";
import EventHandlerInterface from "./event-handler.interface";

export default interface EventDispatcherInterface {

    notify(event: EventInterface): void;

    register(event: EventInterface, handler: EventHandlerInterface<EventInterface>): void;

    unregister(event: EventInterface, handler: EventHandlerInterface<EventInterface>): void;

    unregisterAll(): void;
}