import React from 'react'
import styles from './FacebookLogin.module.scss';
import FacebookIcon from '@mui/icons-material/Facebook';

function FacebookLogin() {
    return (
        <div className={styles['container']}>
            <div className={styles['btn-login-facebook']}>
                <FacebookIcon /> 
                <span>Login with Facebook</span>
            </div>
        </div>
    )
}

export default FacebookLogin;
