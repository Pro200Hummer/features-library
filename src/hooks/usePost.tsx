import {PostItemType} from "../types/appTypes";
import {useMemo} from "react";

const useSortedPosts = (posts: PostItemType[], sort: string) => {
    return useMemo(() => {
        if (sort) {
            if (sort === 'title') {
                return [...posts].sort((a, b) => a.title.localeCompare(b.title))
            }
            if (sort === 'description') {
                return [...posts].sort((a, b) => a.body.localeCompare(b.body))
            }
            if (sort === 'default') {
                return [...posts].sort((a, b) => a.id < b.id ? -1 : 1)
            }
        } else {
            return posts
        }
    }, [sort, posts])
}

export const usePosts = (posts: PostItemType[], sort: string, query: string) => {
    const sortedPosts = useSortedPosts(posts, sort)

    return useMemo(() => {
        if (sortedPosts) {
            return sortedPosts
                .filter(post => post.title.toLowerCase()
                    .includes(query.toLowerCase()))
        }
    }, [query, sortedPosts])
}