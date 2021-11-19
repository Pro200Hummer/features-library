import React, {PropsWithChildren} from 'react';

interface ButtonProps {
    handler: () => void
    className?: string
}

export const Button = (props: PropsWithChildren<ButtonProps>) => {
    const {handler, className, children} = props

    return <button onClick={handler} className={className}>{children}</button>
};
