interface SlashCommand {
    data: Record<string, any>
    execute: (...args: any[]) => void   
}

interface ValidSlash {
    valid: SlashCommand[]
    invalid: any[]
}

export { SlashCommand, ValidSlash }