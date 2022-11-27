import Eris, { ApplicationCommandStructure } from 'eris'

type SlashCommand = ApplicationCommandStructure & {
    handler: (interaction:
        Eris.CommandInteraction<Eris.TextableChannel>
    ) => void
}

export { SlashCommand }
