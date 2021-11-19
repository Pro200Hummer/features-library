import React, {ChangeEvent, PropsWithChildren} from 'react';

interface InputProps {
    value: string
    handler: (e: ChangeEvent<HTMLInputElement>) => void
    className?: string
}

export const Input = (props: PropsWithChildren<InputProps>) => {
    const {value, className, handler} = props

    return <input type="text" placeholder={'Enter the title'} value={value} onChange={handler} className={className}/>
};
