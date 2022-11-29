const URL = process.env['URL'] as string

const get = async <T> (path: string, method: string): Promise<T> => {
    const resp = await fetch(`${URL}${path}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        credentials: 'include'
    })

    return (await resp.json()) as T
}

export { get }
