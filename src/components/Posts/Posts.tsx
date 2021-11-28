import React, {useCallback, useEffect, useState} from 'react';
import {Filter, PostItemType} from "../../types/appTypes";
import {PostItem} from "./PostItem";
import PostsFilter from "./PostsFilter";
import {Modal} from "../UI/Modal/Modal";
import {Button} from "../UI/Button/Button";
import {PostsHandler} from "./PostsHandler";
import {usePosts} from "../../hooks/usePost";
import {postsApi} from "../../api/app-api";
import {Preloader} from "../UI/Preloader/Preloader";
import {useFetching} from "../../hooks/useFetching";

const Posts = () => {
    const [posts, setPosts] = useState<PostItemType[]>([])
    const [filter, setFilter] = useState<Filter>({sort: '', query: ''})
    const [modal, setModal] = useState<boolean>(false)
    const [fetchPosts, isLoading, error, setError] = useFetching(async () => {
        const res = await postsApi.getPosts()
        res.data.length ? setPosts(res.data) : setPosts([res.data])
    })
    const searchingAndSortedPosts = usePosts(posts, filter.sort, filter.query)

    useEffect(() => {
        fetchPosts()
        return () => {
            setPosts([])
            setError('')
        }
    }, [])

    const addPost = useCallback((params: { title: string, body: string }) => {
        setPosts([
            ...posts,
            {userId: 10, id: posts.length + 1, ...params}
        ])
        setModal(false)
    }, [posts])

    const deletePost = (postId: number) => {
        setPosts(posts.filter(p => p.id !== postId))
    }

    const content = searchingAndSortedPosts && searchingAndSortedPosts.length > 0 ?
        searchingAndSortedPosts.map((p: PostItemType) => <PostItem
                key={p.id}
                userId={p.userId}
                id={p.id}
                title={p.title}
                body={p.body}
                deletePost={deletePost}
            />
        ) : <h1>Posts not found</h1>

    return <>
        <Button handler={() => setModal(true)}>Create Post</Button>
        <Modal visible={modal} setVisible={setModal}>
            <PostsHandler addPost={addPost}/>
        </Modal>
        <PostsFilter filter={filter} setFilter={setFilter}/>
        <h2 style={{textAlign: 'center'}}>Posts List</h2>
        {error && <h2 style={{color: 'red'}}>{error}</h2>}
        {isLoading ? <Preloader/> : content}
    </>

};

export default Posts;