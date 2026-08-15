import { Client, ClientEvents } from "discord.js";

interface EventType {
    data?: keyof ClientEvents;
    name?: keyof ClientEvents;
    execute: (...args: any[]) => void   
}

export class ApplicationEvents {
    #client: Client;

    constructor(client: Client) {
        this.#client = client
    }
    
    /**
         * Listens to a list of events and executes their corresponding actions.
         *
         * @param {EventType[]} events - Array of event objects. Each event should contain:
         *   - `data`: information related to the event
         *   - `execute`: function that will be called when the event occurs
         *
         * @returns {Promise<void>} Returns a Promise that resolves when all events are being listened to.
         */
    async listenEvents (events: EventType[]) {
        for (const event of events) {
            const eventName = (event.data ?? event.name) as keyof ClientEvents
            
            this.#client.on(eventName, (...args: any[]) => {
                    const message = args[0]
                        if (message && "author" in message && message.author?.bot) return;
                        event.execute(...args)
            })
        }
    }
}