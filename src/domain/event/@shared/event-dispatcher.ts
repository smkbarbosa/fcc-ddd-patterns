import EventDispatcherInterface from "./event-dispatcher.interface";
import EventInterface from "./event.interface";
import EventHandlerInterface from "./event-handler.interface";

export default class EventDispatcher implements EventDispatcherInterface {
    private eventHandlers: { // @ts-ignore
        [eventName: string]: EventHandlerInterface[] } = {};

    get getEventHandlers(): { // @ts-ignore
        [eventName: string]: EventHandlerInterface[] } {
        return this.eventHandlers;
    }

    // @ts-ignore
    register(eventName: string, handler: EventHandlerInterface): void {
        if (!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = [];
        }
        this.eventHandlers[eventName].push(handler);
    }

    // @ts-ignore
    unregister(eventName: string, handler: EventHandlerInterface): void {
        if (this.eventHandlers[eventName]) {
            const index = this.eventHandlers[eventName].indexOf(handler);
            if (index !== -1) {
                this.eventHandlers[eventName].splice(index, 1);
            }
        }
    }

    unregisterAll(): void {
        this.eventHandlers = {};

    }

    notify(event: EventInterface): void {
        const eventName = event.constructor.name;

        if (this.eventHandlers[eventName]) {
            this.eventHandlers[eventName].forEach((eventHandler) => {
                eventHandler.handle(event);
            });
        }
    }

}