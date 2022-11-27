interface Step {
    name: string
    desc: string
    number: number
}

interface Post {
    id: string,
    title: string,
    desc: string,
    answer: string,
    check: string,
    steps: Step[],
    created_at: string,
    author_id: string,
}

export { Post, Step }