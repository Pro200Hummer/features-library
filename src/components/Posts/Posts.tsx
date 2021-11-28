import React, {useCallback, useState} from 'react';
import {Filter, PostItemType} from "../../types/appTypes";
import {PostItem} from "./PostItem";
import PostsFilter from "./PostsFilter";
import {Modal} from "../UI/Modal/Modal";
import {Button} from "../UI/Button/Button";
import {PostsHandler} from "./PostsHandler";
import {usePosts} from "../../hooks/usePost";

const Posts = () => {
    const [posts, setPosts] = useState<PostItemType[]>([
        {id: 1, title: 'TypeScript', description: 'Description'},
        {id: 2, title: 'JavaScript', description: 'Some description'},
        {id: 3, title: 'ReactJS', description: 'Any description'},
    ])

    const [filter, setFilter] = useState<Filter>({sort: 'default', query: ''})
    const [modal, setModal] = useState<boolean>(false)
    const searchingAndSortedPosts = usePosts(posts, filter.sort, filter.query)

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