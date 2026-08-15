import { DisfoxComponentAttachment } from "./disfoxComponentAttachment.test.js";

export class DisfoxComponent {
    attachment: DisfoxComponentAttachment | null = null
    needsAttachment: boolean = false;
    allowAttach: boolean = false;

    constructor() {

    }
}