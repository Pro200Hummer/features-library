import React, {ChangeEvent} from 'react';

type OptionsType = {
    value: string
    text: string
}

interface Sorting {
    defaultValue: string
    options: OptionsType[]
    sortValue: string
    handler: (e: ChangeEvent<HTMLSelectElement>) => void
    className?: string
}

export const Select = React.memo((props: Sorting) => {
    const {defaultValue, sortValue, options, handler, className} = props

    return <select
        name="sorting"
        className={className}
        value={sortValue}
        onChange={handler}
    >
        <option disabled value={defaultValue}>Sorted by:</option>
        {options.map((o) => <option key={o.value} value={o.value}>{o.text}</option>)}
    </select>

});