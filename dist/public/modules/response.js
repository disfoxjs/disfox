var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Response_success, _Response_content, _Response_errorContent, _Response_source;
class Response {
    constructor(source = null) {
        _Response_success.set(this, void 0);
        _Response_content.set(this, void 0);
        _Response_errorContent.set(this, void 0);
        _Response_source.set(this, void 0);
        __classPrivateFieldSet(this, _Response_success, false, "f");
        __classPrivateFieldSet(this, _Response_content, {}, "f");
        __classPrivateFieldSet(this, _Response_errorContent, { content: '' }, "f");
        __classPrivateFieldSet(this, _Response_source, source, "f");
    }
    success(content) {
        if (content === undefined)
            throw new Error("Response.success needs content.");
        __classPrivateFieldSet(this, _Response_success, true, "f");
        __classPrivateFieldSet(this, _Response_content, content, "f");
        __classPrivateFieldSet(this, _Response_errorContent, { content: '' }, "f");
        return this;
    }
    error(content) {
        __classPrivateFieldSet(this, _Response_success, false, "f");
        __classPrivateFieldSet(this, _Response_errorContent, content, "f");
        return this;
    }
    get result() {
        return { success: __classPrivateFieldGet(this, _Response_success, "f"), content: __classPrivateFieldGet(this, _Response_content, "f"), errorContent: __classPrivateFieldGet(this, _Response_errorContent, "f"), source: __classPrivateFieldGet(this, _Response_source, "f") };
    }
}
_Response_success = new WeakMap(), _Response_content = new WeakMap(), _Response_errorContent = new WeakMap(), _Response_source = new WeakMap();
export { Response };
