import { DisfoxError } from '../private/_disfoxerror.js';
import { DisfoxErrorCode } from '../private/_disfox.errorCode.js';
import { SlashOptions } from '../public/index.js';
function setupOption(djsop, op) {
    djsop.setName(op.data.name);
    djsop.setDescription(op.data.description);
    djsop.setRequired(op.data.required);
}
export default function slashOptionAdapter(input, output) {
    const commandData = input.data;
    for (const option of commandData.options) {
        const optionData = option.data;
        let djsOpChoices = [];
        for (const [name, value] of Object.entries(optionData.choices)) {
            djsOpChoices.push({ name, value });
        }
        if (typeof optionData.description !== "string") {
            throw new DisfoxError({
                "code": DisfoxErrorCode.INVALID_TYPE,
                "message": `Command description must be of type string. Received value: ${optionData.description}`,
                "source": { "body": `SlashService.getDFXFile` },
            });
        }
        ;
        switch (optionData.type) {
            case SlashOptions.String:
                output.addStringOption(op => {
                    setupOption(op, option);
                    op.addChoices(...djsOpChoices.map(c => {
                        if (!(typeof c.value === 'string')) {
                            throw new DisfoxError({
                                code: DisfoxErrorCode.INVALID_TYPE,
                                message: `Invalid choice. Expected choice type <string>. Received: ${c.value}`
                            });
                        }
                        return { ...c, value: String(c.value) };
                    }));
                    return op;
                });
                break;
            case SlashOptions.Number:
                output.addNumberOption(op => {
                    if (typeof optionData.settings.minNumber === `number`)
                        op.setMinValue(optionData.settings.minNumber);
                    if (typeof optionData.settings.maxNumber === `number`)
                        op.setMaxValue(optionData.settings.maxNumber);
                    setupOption(op, option);
                    op.addChoices(...djsOpChoices.map(c => {
                        if (!(typeof c.value === 'number')) {
                            throw new DisfoxError({
                                code: DisfoxErrorCode.INVALID_TYPE,
                                message: `Invalid choice. Expected choice type <number>. Received: ${c.value}`
                            });
                        }
                        return { ...c, value: Number(c.value) };
                    }));
                    return op;
                });
                break;
            case SlashOptions.Mentionable:
                output.addMentionableOption(input => {
                    input.setName(optionData.name).setDescription(optionData.description);
                    input.setRequired(optionData.required);
                    return input;
                });
                break;
            case SlashOptions.Boolean:
                output.addBooleanOption(input => {
                    input.setName(optionData.name).setDescription(optionData.description);
                    input.setRequired(optionData.required);
                    return input;
                });
                break;
            case SlashOptions.Role:
                output.addRoleOption(input => {
                    input.setName(optionData.name).setDescription(optionData.description);
                    input.setRequired(optionData.required);
                    return input;
                });
                break;
            case SlashOptions.Attachment:
                output.addAttachmentOption(input => {
                    input.setName(optionData.name).setDescription(optionData.description);
                    input.setRequired(optionData.required);
                    return input;
                });
                break;
            case SlashOptions.Channel:
                output.addChannelOption(input => {
                    input.setName(optionData.name).setDescription(optionData.description);
                    input.setRequired(optionData.required);
                    if (optionData.settings.channelT?.length > 0) {
                        input.addChannelTypes(...optionData.settings.channelT);
                    }
                    return input;
                });
                break;
        }
    }
}
