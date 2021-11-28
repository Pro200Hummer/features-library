import React, {ChangeEvent, FC} from 'react';
import style from "../../styles/PostFilter.module.scss";
import {Input} from "../UI/Input/Input";
import {Select} from "../UI/Select/Select";
import {Filter} from "../../types/appTypes";

interface PostsFilter {
    filter: Filter
    setFilter: (obj: Filter) => void
}

const PostsFilter: FC<PostsFilter> = ({filter, setFilter}) => {

    const sortingOptions = [
        {value: 'default', text: 'No sorting'},
        {value: 'title', text: 'Sorted by title'},
        {value: 'description', text: 'Sorted by description'},
    ]

    const sortingHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setFilter({...filter, sort: e.currentTarget.value})
    }
    const searchingHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter({...filter, query: e.currentTarget.value})
    }

    return (
        <div className={style.container}>
            <Input
                type="text"
                placeholder="Search"
                value={filter.query}
                handler={searchingHandler}
                className={style.input}
            />
            <Select
                defaultValue='sorted'
                options={sortingOptions}
                sortValue={filter.sort}
                handler={sortingHandler}
                className={style.select}
            />
        </div>
    );
};

export default PostsFilter;