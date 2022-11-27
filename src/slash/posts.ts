/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CommandInteraction, Constants, TextableChannel } from 'eris'

import { SlashCommand } from '../@types/commands'
import { getPosts } from '../controllers/aridia'

const definition: SlashCommand = {
    name: 'posts',
    description: 'Get all posts from Aridia.',
    type: Constants.ApplicationCommandTypes.CHAT_INPUT,
    options: [
        {
            name: 'author',
            description: 'Filter the posts by the author.',
            type: Constants.ApplicationCommandOptionTypes.USER,
            required: false,
            channel_types: [] as never,
        },
        {
            name: 'verified',
            description: 'Filter the posts by the verification status.',
            type: Constants.ApplicationCommandOptionTypes.STRING,
            required: false,
            choices: [
                { value: 'community', name: 'community' },
                { value: 'official', name: 'official' },
                { value: 'none', name: 'none' },
            ]
        },
        {
            name: 'sort-by-title',
            description: 'Sort the posts by the title.',
            type: Constants.ApplicationCommandOptionTypes.STRING,
            required: false,
        }
    ],
    handler: async (interaction: CommandInteraction<TextableChannel>) => {
        let posts = await getPosts()

        for (const option of interaction.data.options || []) {
            console.log(option.name, option)

            if (option.name === 'verified') { // @ts-ignore
                posts = posts.filter((post) => post.check === option.value)
            }

            if (option.name === 'author') { // @ts-ignore
                posts = posts.filter((post) => post.author_id === option.value)
            }

            if (option.name === 'sort-by-title') {
                posts = posts.filter( // @ts-ignore
                    (post) => post.title.toLowerCase().includes(option.value)
                )
            }

        }

        interaction.createMessage(JSON.stringify(posts))
    }
}

export default definition
