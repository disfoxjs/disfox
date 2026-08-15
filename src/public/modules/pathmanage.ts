import path from 'path';
import fs from 'fs'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export class PathManage {
    #paths: Record<string, string>

    constructor() {
        this.#paths = {}
    }

    public getRoot(dir: string = __dirname):string {
        const pkgPath = path.join(dir, 'package.json')
        if (fs.existsSync(pkgPath)) return dir;

        const parent = path.dirname(dir)
        if (parent === dir) throw new Error('Root not found...');
       return this.getRoot(parent);
    }

    public set(name: string, path:string): void {
        if (this.#paths.hasOwnProperty(name)) {
            throw new Error(`The path ${name} has already been defined.`)
        }
        this.#paths[name] = path
        
    }
    public get(name: string): string {
        if (!this.#paths.hasOwnProperty(name)) {
            throw new Error(`The path ${name} is not found.`)
        }
        return this.#paths[name]
    }

    public remove(name: string): void {
        if (!this.#paths.hasOwnProperty(name)) {
            throw new Error(`The path ${name} is not found.`)
        }

        delete this.#paths[name]
    }
}