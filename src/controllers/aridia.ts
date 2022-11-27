import { Post } from '../@types/aridia'

const URL = process.env['URL'] as string

const getPosts = async (): Promise<Post[]> => {
    const resp = await fetch(`${URL}/api/posts`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        credentials: 'include'
    })

    return (await resp.json()) as Post[]
}

export { getPosts }
