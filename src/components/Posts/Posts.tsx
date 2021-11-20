import React, {useCallback, useState} from 'react';
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
        {id: 2, title: 'JavaScript', description: 'Description'},
        {id: 3, title: 'ReactJS', description: 'Description'},
    ])
    const sortingOptions = [
        {value: 'default', text: 'No sorting'},
        {value: 'title', text: 'Sorted by title'},
        {value: 'description', text: 'Sorted by description'},
    ]

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
        <Select defaultValue='sorted' options={sortingOptions}/>
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