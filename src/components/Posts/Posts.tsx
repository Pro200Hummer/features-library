import React, {useCallback, useMemo, useState} from 'react';
import {PostItem} from "./PostItem";
import {PostsHandler} from "./PostsHandler";
import PostsFilter from "./PostsFilter";
import {Modal} from "../UI/Modal/Modal";
import {Button} from "../UI/Button/Button";

export interface PostItemType {
    id: number
    title: string
    description: string
}
export interface Filter {
    sort: string
    query: string
}

const Posts = () => {
    const [posts, setPosts] = useState<PostItemType[]>([
        {id: 1, title: 'TypeScript', description: 'Description'},
        {id: 2, title: 'JavaScript', description: 'Some description'},
        {id: 3, title: 'ReactJS', description: 'Any description'},
    ])

    const [filter, setFilter] = useState<Filter>({sort: 'default', query: ''})
    const [modal, setModal] = useState<boolean>(false)

    const sortedPosts = useMemo(() => {
        if (filter.sort) {
            if (filter.sort === 'title') {
                return [...posts].sort((a, b) => a.title.localeCompare(b.title))
            }
            if (filter.sort === 'description') {
                return [...posts].sort((a, b) => a.description.localeCompare(b.description))
            }
            if (filter.sort === 'default') {
                return [...posts].sort((a, b) => a.id < b.id ? -1 : 1)
            }
        } else {
            return posts
        }
    }, [filter.sort, posts])

    const searchingAndSortedPosts = useMemo(() => {
        if (sortedPosts) {
            return sortedPosts
                .filter(post => post.title.toLowerCase()
                    .includes(filter.query.toLowerCase()))
        }
    }, [filter.query, sortedPosts])

    const addPost = useCallback((params: { title: string, description: string }) => {
        setPosts([
            ...posts,
            {id: posts.length + 1, ...params}
        ])
        setModal(false)
    }, [posts])

    const deletePost = (postId: number) => {
        setPosts(posts.filter(p => p.id !== postId))
    }

    return <>
        <Button handler={() => setModal(true)}>Create Post</Button>
        <Modal visible={modal} setVisible={setModal}>
            <PostsHandler addPost={addPost}/>
        </Modal>
        <PostsFilter filter={filter} setFilter={setFilter}/>
        <h2 style={{textAlign: 'center'}}>Posts List</h2>
        {searchingAndSortedPosts && searchingAndSortedPosts.length > 0 ?
            searchingAndSortedPosts.map((p: PostItemType) => <PostItem
                    key={p.id}
                    id={p.id}
                    title={p.title}
                    description={p.description}
                    deletePost={deletePost}
                />
            ) : <h1>Posts not found</h1>
        }
    </>

};

export default Posts;