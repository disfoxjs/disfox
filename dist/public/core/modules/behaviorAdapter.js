export class BehaviorAdapter {
    static throw_execError() {
    }
    static async adv(payload) {
        console.log("Advance ativado!");
        const tableData = payload.cmd.data.disfoxData?.behaviorTable ?? null;
        if (tableData?.config?.onViolate) {
            const onViolate = tableData?.config?.onViolate;
            if (onViolate.alert) {
                const content = { content: onViolate.alert.content, flags: onViolate.alert.flags ?? undefined };
                if (payload.interaction.replied) {
                    console.log("Caiu no replied");
                    await payload.interaction.editReply(content);
                    //return { continue: false }
                }
                else {
                    await payload.interaction.reply(content);
                    //return { continue: false }
                }
            }
            if (onViolate.applyTimeout) {
                try {
                    const member = payload.interaction.member;
                    await member.timeout(onViolate.applyTimeout.duration, onViolate.applyTimeout.reason ?? "Not provided.");
                }
                catch (error) {
                    console.error("ERROR TO EXECUTE BETHABIOR TABLE: ", error);
                }
            }
            return {};
        }
    }
    static async execute(payload) {
        // Se o comando não tiver nenhuma tabela, retorna.
        if (!payload.cmd.data.disfoxData?.behaviorTable)
            return { continue: true };
        if (!payload.interaction.isChatInputCommand()) {
            console.log('not passed: ', payload);
            return { continue: true };
        }
        const tableData = payload.cmd.data.disfoxData.behaviorTable;
        const userId = payload.interaction.user.id;
        const restricted = tableData.config.restricted || null;
        const allowed = tableData.config.allowed || null;
        console.log("I'm here!");
        if (restricted?.userId?.includes(userId)) {
            const task = await this.adv(payload);
            return task;
        }
    }
}
