export interface PostItemType {
    userId: number
    id: number
    title: string
    body: string
}

export interface Filter {
    sort: string
    query: string
}