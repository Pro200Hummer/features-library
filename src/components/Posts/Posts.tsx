import React, {ChangeEvent, useCallback, useMemo, useState} from 'react';
import {PostItem} from "./PostItem";
import {PostsHandler} from "./PostsHandler";
import {Select} from "../UI/Select/Select";
import {Input} from "../UI/Input/Input";

export interface PostItemType {
    id: number
    title: string
    description: string
}

const Posts = () => {
    const [posts, setPosts] = useState<PostItemType[]>([
        {id: 1, title: 'TypeScript', description: 'Description'},
        {id: 2, title: 'JavaScript', description: 'Some description'},
        {id: 3, title: 'ReactJS', description: 'Any description'},
    ])
    const sortingOptions = [
        {value: 'default', text: 'No sorting'},
        {value: 'title', text: 'Sorted by title'},
        {value: 'description', text: 'Sorted by description'},
    ]

    const [sortValue, setSortValue] = useState<string>('default')
    const [searchValue, setSearchValue] = useState<string>('')

    const sortingHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setSortValue(e.currentTarget.value)
    }
    const searchingHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value)
    }

    const sortedPosts = useMemo(() => {
        if (sortValue) {
            if (sortValue === 'title') {
                return [...posts].sort((a, b) => a.title.localeCompare(b.title))
            }
            if (sortValue === 'description') {
                return [...posts].sort((a, b) => a.description.localeCompare(b.description))
            }
            if (sortValue === 'default') {
                return [...posts].sort((a, b) => a.id < b.id ? -1 : 1)
            }
        } else {
            return posts
        }
    }, [sortValue, posts])


    const searchingAndSortedPosts = useMemo(() => {
        if (sortedPosts) return sortedPosts.filter(post => post.title.toLowerCase().includes(searchValue.toLowerCase()))
    }, [searchValue, sortedPosts])


    const addPost = useCallback((params: { title: string, description: string }) => {
        setPosts([
            ...posts,
            {id: posts.length + 1, ...params}
        ])
    }, [posts])

    const deletePost = (postId: number) => {
        setPosts(posts.filter(p => p.id !== postId))
    }

    return <>
        <PostsHandler addPost={addPost}/>
        <Input type="text" value={searchValue} handler={searchingHandler}/>
        <Select defaultValue='sorted' options={sortingOptions} sortValue={sortValue} handler={sortingHandler}/>
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