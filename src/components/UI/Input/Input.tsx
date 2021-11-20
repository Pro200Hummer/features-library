import React, {ChangeEvent, PropsWithChildren} from 'react';

interface InputProps {
    type: string
    value: string
    handler: (e: ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    className?: string
}

export const Input = React.memo((props: PropsWithChildren<InputProps>) => {
    const {type, value, placeholder, className, handler} = props

    return <input type={type} placeholder={placeholder} value={value} onChange={handler} className={className}/>
});
