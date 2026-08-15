interface replyTypes {
    content?: string,
    components?: unknown,
    embeds: any[]
}

export async function sendC(
    token: string,
    channelID: string,
    payload: replyTypes
) {
    try {
        const res = await fetch(
            `https://discord.com/api/v10/channels/${channelID}/messages`,
            {
                method: 'POST',
                headers: {
                    "Authorization": `Bot ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            }
        )

        if (!res.ok) {
            const error = await res.text()
            throw new Error(`Discord API error: ${res.status} - ${error}`)
        }

        const data = await res.json()
        return data
    } catch (e) {
        console.error(e)
        throw e
    }
}
