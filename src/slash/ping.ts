import { CommandInteraction, Constants, TextableChannel } from 'eris'
import { SlashCommand } from '../@types/commands'

const definition: SlashCommand = {
    name: 'ping',
    type: Constants.ApplicationCommandTypes.CHAT_INPUT,
    description: 'ping command',
    handler: (interaction: CommandInteraction<TextableChannel>) => {
        interaction.createMessage('ping')
    },
    defaultPermission: false,
    options: []
}

export default definition
