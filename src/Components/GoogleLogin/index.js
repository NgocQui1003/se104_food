import React from 'react'
import styles from './GoogleLogin.module.scss';
import GoogleIcon from '@mui/icons-material/Google';

function GoogleLogin() {
    return (
        <div className={styles['container']}>
            <div className={styles['btn-login-google']}>
                <GoogleIcon /> 
                <span>Login with Google</span>
            </div>
        </div>
    )
}

export default GoogleLogin;
