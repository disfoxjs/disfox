import fs from 'fs/promises'
import { constants } from 'fs';
import { Response } from './response.js';


async function exists(path: string) {
    try {
        await fs.access(path, constants.F_OK)
        return true
    } catch {
        return false
    }
}

export class FileManage {
    #files: Record<string, string>

    constructor() {
        this.#files = {}
    }

    public async readContent(path: string, options: {encoding?: null | undefined;}) {
        const response = new Response({path: path, options: options, method: 'FileManage.readContent()'})

        try {
            const existsFile = await exists(path)
            if (!existsFile) {
                response.error({message: "File not found", 'content': `File not found in directory: ${path}`})
                return response.result
            }
            const content = await fs.readFile(path, options)
            response.success(content)
            return response.result

        } catch (err) {
            throw response.error({"message": "Occurred an internal error", "content": err})
        } 
    }

}