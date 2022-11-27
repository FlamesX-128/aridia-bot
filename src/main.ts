import { config } from 'dotenv'
config()

import walkdir from 'require-all'
import Eris from 'eris'

import { SlashCommand } from './@types/commands'

const app = Eris(process.env['TOKEN'] as string, {
    intents: []
})

const slash_commands: SlashCommand[] = []

app.on('ready', async () => {
    const commands = await app.getCommands()

    if (commands.length) return

    for (const command of slash_commands) {
        await app.createGuildCommand('786747600514056212', command)
    }

    console.log('Ready!')
})

app.on('interactionCreate', (interaction) => {
    if (!(interaction instanceof Eris.CommandInteraction)) return

    slash_commands.find(
        (command) => command.name === interaction.data.name
    )?.handler(interaction)
})

walkdir({
    dirname: __dirname + '/slash',
    filter: /(.+)\.js$/,
    recursive: true,
    resolve: (command: { default: SlashCommand }) => {
        console.log(`Loaded ${command.default.name} command`)
        slash_commands.push(command.default)
    }
})

app.connect()
