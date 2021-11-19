import React from 'react';
import style from "./styles/App.module.scss"
import Posts from "./components/Posts/Posts";

export const App = () => {
    return (
        <div className={style.app}>
            <Posts />
        </div>
    )
};