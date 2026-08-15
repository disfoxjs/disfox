import path from "path";
import fs from "fs";
export class EventService {
    /**
     * Extracts all event modules from a directory.
     *
     * This method reads all `.js` files in the given directory, imports them dynamically,
     * and separates them into valid and invalid events. A valid event is an object
     * containing both `data` and `execute` properties.
     *
     * @param {string} dir - The path to the directory containing event files.
     * @returns {Promise<{ valid: any[], invalid: EventType[] }>} An object containing arrays of valid and invalid events.
     */
    static async extractDir(dir) {
        const eventsPath = path.resolve(dir);
        const files = fs.readdirSync(eventsPath);
        let valid = [];
        let invalid = [];
        for (const file of files) {
            const filePath = path.join(eventsPath, file);
            const imported = await import(`file://${filePath.replace(/\\/g, "/")}`);
            const event = imported.default ?? imported;
            if (("data" in event || "name" in event) && "execute" in event) {
                valid.push(event);
            }
            else {
                invalid.push(event);
            }
        }
        return { valid, invalid };
    }
    /**
     * Extracts a single event module from a file.
     *
     * This method imports a `.js` file dynamically and checks if it contains
     * both `data` and `execute` properties. Throws an error if the file extension
     * is unsupported.
     *
     * @param {string} filePath - The path to the `.js` event file.
     * @returns {Promise<{ valid: EventType[], invalid: any[] }>} An object containing the valid event or invalid module.
     * @throws {DisfoxError} If the file extension is not `.js`.
     */
    static async extractFile(filePath) {
        const valid = [];
        const invalid = [];
        const resolved = path.resolve(filePath);
        const imported = (await import(`file://${resolved.replace(/\\/g, "/")}`));
        const event = imported.default ?? imported;
        if (("data" in event || "name" in event) && "execute" in event) {
            valid.push(event);
        }
        else {
            invalid.push(event);
        }
        return { valid, invalid };
    }
}
