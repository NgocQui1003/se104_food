import React from 'react'
import styles from './ThirdPartyGoogle.module.scss';
import GoogleIcon from '@mui/icons-material/Google';

import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux';

import thirdpartyApi from '../../Api/thirdpartyApi';

function ThirdPartyGoogle() {

    const dispatch = useDispatch();
    const responseSuccessGoogle = (response) => {
        let tokenId = response.tokenId
        dispatch(thirdpartyApi.requestGoogle(tokenId))
    }

    const responseErrorGoogle = (res) => {
        console.log(res);
    }


    return (
        <div className={styles['container']}>
            {/* <div className={styles['btn-login-google']}>
                <GoogleIcon /> 
                <span>Login with Google</span>
            </div> */}

            <GoogleLogin
                clientId="811148561616-u5o162igd4bdqkb26lan40e7t356hh7f.apps.googleusercontent.com"
                buttonText="Đăng nhập bằng Google"
                onSuccess={responseSuccessGoogle}
                onFailure={responseErrorGoogle}
                cookiePolicy={'single_host_origin'}
                className='btn-login-google'
            />
        </div>
    )
}

export default ThirdPartyGoogle;
