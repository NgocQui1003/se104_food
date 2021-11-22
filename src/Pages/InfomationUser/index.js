import React, { Component, useState } from 'react';

import styles from '../SavedPostList/SavedPostList.module.scss';
import UserMenu from '../../Components/UserMenu';

import logo from '../../Assets/100x100.png'


function InformationUser() {

    return (

        <div className={[styles['container'], styles['auth']].join(' ')}>
            <UserMenu />
            

        </div >
    )
}

export default InformationUser;