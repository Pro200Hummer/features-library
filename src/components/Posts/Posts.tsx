import React, {ChangeEvent, useCallback, useState} from 'react';
import {PostItem} from "./PostItem";
import {PostsHandler} from "./PostsHandler";
import {Select} from "../UI/Select/Select";

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

    const [sortValue, setSortValue] = useState<string>('')

    const sortingHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        const sort = e.currentTarget.value
        setSortValue(sort)
       if(sort === 'title') {
           setPosts([...posts].sort((a,b) => a.title.localeCompare(b.title)))
       }
       if(sort === 'description') {
           setPosts([...posts].sort((a,b) => a.description.localeCompare(b.description)))
       }
        if(sort === 'default') {
            setPosts([...posts].sort((a,b) => a.id < b.id ? -1 : 1))
        }

    }

    const addPost = useCallback((params: { title: string, description: string }) => {
        setPosts([
            ...posts,
            {id: posts.length + 1, ...params}
        ])
    },[posts])

    const deletePost = (postId: number) => {
        setPosts(posts.filter(p => p.id !== postId))
    }

    return <>
        <PostsHandler addPost={addPost}/>
        <Select defaultValue='sorted' options={sortingOptions} sortValue={sortValue} handler={sortingHandler}/>
        <h2 style={{textAlign: 'center'}}>Posts List</h2>
        {posts.length === 0 ? <h1>Posts not found</h1> :
            posts.map((p: PostItemType) => <PostItem
                    key={p.id}
                    id={p.id}
                    title={p.title}
                    description={p.description}
                    deletePost={deletePost}
                />
            )}
    </>

};

export default Posts;