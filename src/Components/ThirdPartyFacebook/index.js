import React from 'react'
import styles from './ThirdPartyFacebook.module.scss';
import FacebookIcon from '@mui/icons-material/Facebook';

import FacebookLogin from 'react-facebook-login';
import thirdpartyApi from '../../Api/thirdpartyApi';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import userApi from '../../Api/userApi';
import Auth from '../../Utils/Auth';

import { userActions } from '../../Redux/Actions/userActions';

function ThirdPartyFacebook() {
    const history = useHistory();
    const dispatch = useDispatch();

    const responseFacebook = async (response) => {
        if (response.status == 'unknown') return;
        let accessToken = response.accessToken;
        let userID = response.userID;
        console.log(response);
        const data = await thirdpartyApi.requestFacebook({ accessToken, userID });
        if (data.success) {
            Auth.setToken(data.accessToken)
            const res = await userApi.getProfile();
            dispatch(userActions.setProfile(res.data))
            history.push('/');
        }   
    }

    return (
        <div className={styles['container']}>
            {/* <div className={styles['btn-login-facebook']}>
                <FacebookIcon />
                <span>Login with Facebook</span>
            </div> */}

            <FacebookLogin
                appId="624728648681236"
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
