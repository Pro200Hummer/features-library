import React, {useState} from 'react';
import {PostItem} from "./PostItem";
import {PostsHandler} from "./PostsHandler";

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

    const addPost = (title: string, description: string) => {
        setPosts([
            ...posts,
            {id: posts.length + 1, title, description}
        ])
    }

    const deletePost = (postId: number) => {
        setPosts(posts.filter(p => p.id !== postId))
    }

    return <>
        <PostsHandler addPost={addPost}/>
        <h2 style={{textAlign: 'center'}}>Posts List</h2>
        {posts.map((p: PostItemType) => <PostItem
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