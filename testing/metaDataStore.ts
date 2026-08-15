export class MetaDataStore<T> {
    #cache: Map<any, T>

    constructor(key : any, v: T) {
        this.#cache = new Map();
    }

    public get(key : any) {
        return this.#cache.get(key)
    }

    public set(key : any, v: T) {
        this.#cache.set(key, v)
    }

    public has(key : any) {
        return this.#cache.has(key)
    }
}