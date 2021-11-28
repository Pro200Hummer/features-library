import React, {Dispatch, FC, SetStateAction} from 'react';
import style from "./Modal.module.scss";

interface Modal {
    visible: boolean
    setVisible: Dispatch<SetStateAction<boolean>>
}

export const Modal: FC<Modal> = props => {
    const {visible, setVisible} = props

    const rootClasses = [style.modal]

    if(visible) rootClasses.push(style.active)

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={style.modalContent} onClick={e => e.stopPropagation()}>
                {props.children}
            </div>
        </div>
    )
};
