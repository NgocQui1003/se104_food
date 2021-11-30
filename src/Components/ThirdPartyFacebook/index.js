import React from 'react'
import styles from './ThirdPartyFacebook.module.scss';
import FacebookIcon from '@mui/icons-material/Facebook';

import { ReactDOM } from 'react-dom';
import FacebookLogin from 'react-facebook-login';
import thirdpartyApi from '../../Api/thirdpartyApi';
import { useDispatch } from 'react-redux';



function ThirdPartyFacebook() {
    const dispatch = useDispatch();

    const responseFacebook = (response) => {
        console.log('response facebooks: ');
        console.log(response);
        console.log(response.accessToken);
        let accessToken = response.accessToken;
        let userID = response.userID;
        // dispatch(thirdpartyApi.requestFacebook({ accessToken, userID }));
    }



    return (
        <div className={styles['container']}>
            {/* <div className={styles['btn-login-facebook']}>
                <FacebookIcon />
                <span>Login with Facebook</span>
            </div> */}

            <FacebookLogin
                appId="181077507495514"
                autoLoad={false}
                fields="name, email, gender, picture"
                cssClass={styles['btn-login-facebook']}
                textButton="Đăng nhập bằng Facebook"
                icon={<FacebookIcon />}
                callback={responseFacebook}
            />
        </div>
    )
}

export default ThirdPartyFacebook;
