/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CommandInteraction, Constants, TextableChannel, EmbedOptions, Embed } from 'eris'
import { Post } from '../@types/aridia'

import { SlashCommand } from '../@types/commands'
import { get } from '../controllers/aridia'

const options: { [key: string]: string } = {
    'author': 'author_id',
    'title': 'title',
    'check': 'check',
}

const createEmbedOfPosts = (interaction: CommandInteraction<TextableChannel>, items: null | Post[]) => {
    const embed: EmbedOptions = {
        title: 'Aridia Posts',
        description: 'Here are the posts that match your query',
        color: 0x48BEEC,
        footer: {
            icon_url: (interaction.user?.avatarURL) || '',
            text: (interaction.user?.username) || '',
        },
        fields: [],
    }

    for (const post of items || []) {
        embed.fields?.push({
            name: post.title,
            value: post.desc.length > 15 ? `${post.desc.substring(0, 15)}...` : post.desc,
            inline: false,
        })
    }

    return embed
} 

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
            name: 'check',
            description: 'Filter the posts by the verification status.',
            type: Constants.ApplicationCommandOptionTypes.STRING,
            required: false,
            choices: [
                { value: 'community', name: 'community' },
                { value: 'official', name: 'official' },
                { value: '', name: 'none' },
            ]
        },
        {
            name: 'title',
            description: 'Filter the posts by the title.',
            type: Constants.ApplicationCommandOptionTypes.STRING,
            required: false,
        }
    ],
    handler: async (interaction: CommandInteraction<TextableChannel>) => {
        const path = ['posts', '?']

        for (const option of interaction.data.options || []) {
            if (path.length > 2) path.push('&') // @ts-ignore

            path.push(options[option.name] + '=' + option.value)
        }

        interaction.createMessage({
            embeds: [createEmbedOfPosts(interaction, await get<null | Post[]>(path.join(''), 'GET'))],
            
        })

    }

}

export default definition
