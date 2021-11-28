import React, {PropsWithChildren} from 'react';
import style from "./Button.module.scss"

interface ButtonProps {
    handler: () => void
    className?: string
}

export const Button = (props: PropsWithChildren<ButtonProps>) => {
    const {handler, className, children} = props

    const rootClasses = className ? className : style.button

    return <button onClick={handler} className={rootClasses}>{children}</button>
};
