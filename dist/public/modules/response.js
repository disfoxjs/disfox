/**
 * @deprecated Response is deprecated and is no longer supported.
 * Deprecated since Disfox v0.1.4.
 */
class Response {
    #success;
    #content;
    #errorContent;
    #source;
    constructor(source = null) {
        this.#success = false;
        this.#content = {};
        this.#errorContent = { content: '' };
        this.#source = source;
    }
    success(content) {
        if (content === undefined)
            throw new Error("Response.success needs content.");
        this.#success = true;
        this.#content = content;
        this.#errorContent = { content: '' };
        return this;
    }
    error(content) {
        this.#success = false;
        this.#errorContent = content;
        return this;
    }
    get result() {
        return { success: this.#success, content: this.#content, errorContent: this.#errorContent, source: this.#source };
    }
}
export { Response };
