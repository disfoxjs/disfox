import { Client, ClientEvents } from "discord.js";
interface EventType {
    data?: keyof ClientEvents;
    name?: keyof ClientEvents;
    execute: (...args: any[]) => void;
}
export declare class ApplicationEvents {
    #private;
    constructor(client: Client);
    /**
         * Listens to a list of events and executes their corresponding actions.
         *
         * @param {EventType[]} events - Array of event objects. Each event should contain:
         *   - `data`: information related to the event
         *   - `execute`: function that will be called when the event occurs
         *
         * @returns {Promise<void>} Returns a Promise that resolves when all events are being listened to.
         */
    listenEvents(events: EventType[]): Promise<void>;
}
export {};
//# sourceMappingURL=applicationEvents.d.ts.map