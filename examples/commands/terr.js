import { SlashService } from "disfox";

const c = new SlashService.Command('error')
    .description("Throw new error")
    .action(async () => {
        throw new Error("Error to test disfox")
    });

export default c;