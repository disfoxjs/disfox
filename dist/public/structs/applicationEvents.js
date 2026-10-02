import { DisfoxError } from "../../private/_disfoxerror.js";
import { DisfoxErrorCode } from "../../private/_disfox.errorCode.js";
export class ApplicationEvents {
    #client;
    constructor(client) {
        this.#client = client;
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
    async listenEvents(events) {
        for (const event of events) {
            if (!(typeof event.name === "string")) {
                throw new DisfoxError({
                    code: DisfoxErrorCode.INVALID_TYPE,
                    message: "Expected <string> in EventName."
                });
            }
            this.#client.on(event.name, (...args) => {
                const message = args[0];
                if (message &&
                    "author" in message &&
                    message.author?.bot)
                    return;
                event.execute(...args);
            });
        }
    }
}
