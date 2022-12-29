import EventDispatcherInterface from "./event-dispatcher.interface";
import EventInterface from "./event.interface";
import EventHandlerInterface from "./event-handler.interface";

export default class EventDispatcher implements EventDispatcherInterface {
    private eventHandlers:{ [eventName: string]: EventHandlerInterface[] } = {};

    get getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
        return this.eventHandlers;
    }
    register(eventName: string, handler: EventHandlerInterface[]): void {
        if (!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = [];
        }
        this.eventHandlers[eventName].push(handler);
    }

    unregister(event: EventInterface, handler: EventHandlerInterface<EventInterface>) {
    }

    unregisterAll(): void {

    }

    notify(event: EventInterface) {
    }

}