
import { ErrorContentType, ResponseType } from "../types/responseTypes.js";

class Response {
    #success: boolean;
    #content: Record<string, string>
    #errorContent: ErrorContentType
    #source: { title?: string; message?: string; method?: string; requester?: Record<string, any> | string; status: string | number | unknown };

    constructor(source: any = null) {
        this.#success = false
        this.#content = {}
        this.#errorContent = { content: '' }
        this.#source = source
    }

    success(content: {}) {
        if (content === undefined) throw new Error("Response.success needs content.")
        this.#success = true
        this.#content = content
        this.#errorContent = { content: '' }
        return this
    }

    error(content: ErrorContentType) {
        this.#success = false
        this.#errorContent = content
        return this
    }

    get result() {
        return { success: this.#success, content: this.#content, errorContent: this.#errorContent, source: this.#source }
    }
}

export { Response }
