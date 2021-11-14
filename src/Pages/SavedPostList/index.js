import React, { Component, useState } from 'react';

import styles from '../SavedPostList/SavedPostList.module.scss';
import UserMenu from '../../Components/UserMenu';

import logo from '../../Assets/100x100.png'


function SavedPostList() {

    return (

        <div className={[styles['container'], styles['auth']].join(' ')}>
            <UserMenu />
            <div className={styles['list-container']}>
                <h1 className={styles['list-name']}>Bài viết đã lưu</h1>
                <div className={styles['list-btn']}>

                </div>
                <div className={styles['list-item']}>
                    <div className={styles['list-item__thumbnail']}>
                        <img src={logo} className={styles['thumnail']} />
                    </div>
                    <div className={styles['list-item__content']}>
                        <div className={styles['list-item__name']}>
                            Chân gà sả tắc
                        </div>
                        <div className={styles['list-item__author']}>
                            @ndklien
                        </div>
                        <div className={styles['list-item__description']}>

                        </div>
                    </div>
                </div>
                <div className={styles['menu-btn']}>
                    <button className={styles['menu-btn__deleteOne']} >Xóa</button>
                </div>
            </div>

        </div >
    )
}

export default SavedPostList;