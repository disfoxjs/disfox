interface EventType {
    data: Record<string, any>;
    execute: (...args: any[]) => void;
}
interface ValidEvents {
    valid: EventType[];
    invalid: any[];
}
export declare class EventService {
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
    static extractDir(dir: string): Promise<ValidEvents>;
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
    static extractFile(filePath: string): Promise<{
        valid: EventType[];
        invalid: any[];
    }>;
}
export {};
//# sourceMappingURL=event.service.d.ts.map