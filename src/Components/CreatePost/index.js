import React, { useState } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from 'react-transition-group';

import styles from './CreatePost.module.scss';
import './CreatePost.scss';

const CreatePost = props => {
    
    return ReactDOM.createPortal(
        <CSSTransition
            in={props.open}
            unmountOnExit
            timeout={{enter: 0, exit: 300}}
        >
            <div className={`modal ${props.open ? 'open' : ''}`} onClick={props.onClose}>
                <div className={styles['modal-content']} onClick={e => e.stopPropagation()}>
                    <div className={styles['modal-header']}>
                        <h2 className={styles['moodal-title']}>{props.title}</h2>
                    </div>
                    <div className={styles['modal-body']}>
                        {/* <hr className='hr-1' /> */}
                        {props.children}
                        {/* <hr className='hr-2'/> */}
                    </div>
                    <div className={styles['modal-footer']}>
                        <button type="submit" className={styles['button-submit']} onClick={props.onSubmit}>Xác nhận</button>
                        <button className={styles['button-close']} onClick={props.onClose}>Thoát</button>
                    </div>
                </div>
            </div>
        </CSSTransition>,
        document.getElementById("root")
    );
};

export default CreatePost;