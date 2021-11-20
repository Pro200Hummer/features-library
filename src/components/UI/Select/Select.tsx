import React, {ChangeEvent} from 'react';
import style from '../../../styles/Select.module.scss'

type OptionsType = {
    value: string
    text: string
}

interface Sorting {
    defaultValue: string
    options: OptionsType[]
    sortValue: string
    handler: (e: ChangeEvent<HTMLSelectElement>) => void
}

export const Select = React.memo((props: Sorting) => {
    const {defaultValue, sortValue, options, handler} = props

    return <select
        name="sorting"
        className={style.select}
        value={sortValue}
        onChange={handler}
    >
        <option disabled value={defaultValue}>Sorted by:</option>
        {options.map((o) => <option key={o.value} value={o.value}>{o.text}</option>)}
    </select>

});