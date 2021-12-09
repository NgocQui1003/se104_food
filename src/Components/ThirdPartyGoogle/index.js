import React from 'react'
import styles from './ThirdPartyGoogle.module.scss';

import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import thirdpartyApi from '../../Api/thirdpartyApi';
import userApi from '../../Api/userApi';
import Auth from '../../Utils/Auth';

import { userActions } from '../../Redux/Actions/userActions';
function ThirdPartyGoogle() {
    const history = useHistory();
    const dispatch = useDispatch();
    const responseSuccessGoogle = async (response) => {
        let tokenId = response.tokenId
        const data = await thirdpartyApi.requestGoogle(tokenId);
        
        if (data.success) {
            Auth.setToken(data.accessToken)
            const res = await userApi.getProfile();
            dispatch(userActions.setProfile(res.data))
            history.push('/');
        }        
    }

    const responseErrorGoogle = (res) => {
        console.log(res);
        // alert('Đăng nhập bằng Google thất bại');
    }


    return (
        <div className={styles['container']}>
            <GoogleLogin
                clientId="811148561616-u5o162igd4bdqkb26lan40e7t356hh7f.apps.googleusercontent.com"
                buttonText="Đăng nhập bằng Google"
                onSuccess={(e) => responseSuccessGoogle(e)}
                onFailure={responseErrorGoogle()}
                cookiePolicy={'single_host_origin'}
                className='btn-login-google'
            />
        </div>
    )
}

export default ThirdPartyGoogle;
