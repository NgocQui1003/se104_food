import React, { useState } from "react";
// import "../ForgotPassword/ForgotPassword.scss";

import { useParams, useHistory} from 'react-router-dom'
import ValidateInput from '../../Utils/ValidateInput';
import userApi from '../../Api/userApi';

function ResetPass() {
    const history = useHistory();
    const { token } = useParams();
    const [resetPass, setResetPass] = useState({
        password: '',
        confirmPassword: '',
    })

    const [error, setError] = useState({
        error: '',
        password: '',
        confirmPassword: ''
    })

    const submitHandler = e => {
        e.preventDefault();
        if (error.error===''&&error.password===''&&error.confirmPassword===''){
            console.log('RESET PASSWORD');
            userApi.resetPassword({token, password: resetPass.password})
            .then(res => res.data)
            .then(data => {
                if (data.status){
                    history.push('/dang-nhap')
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

    return (
        <div className="forgotpass">
        <h3>Đặt lại mật khẩu</h3>

        <form onSubmit={submitHandler} >
        <table cellspacings = "5">
            <tr>
                <td className="user">Mật khẩu mới</td>
                <td>
                    <input type='password'
                    className="textbox"
                    onChange={(e) => {
                        setResetPass({ ...resetPass, password: e.target.value })
                    }}
                    onBlur={(e) => {
                        let err = ValidateInput.password(e.target.value);
                        setError({ ...error, password: err })
                    }} 
                    required  />
                </td>
            </tr>
            <tr>
                <td className="user">Nhập lại mật khẩu</td>
                <td>
                    <input type='password' 
                    className="textbox"
                    onChange={(e) => {
                        setResetPass({ ...resetPass, confirmPassWord: e.target.value })
                        if (e.target.value.length>=resetPass.password.length){
                            let err = ValidateInput.validateConfPassWord(e.target.value, resetPass.password);
                            setError({ ...error, confirmPassword: err })    
                        }
                    }}
                    onBlur={(e) => {
                        let err = ValidateInput.validateConfPassWord(e.target.value, resetPass.password);
                        setError({ ...error, confirmPassword: err })
                    }}
                    required  />
                </td>
            </tr>
            <tr height="50">
                <td colspan="2" className="center">
                    <input name="button" type="submit" className="button" />
                </td>
            </tr>
        </table>
    </form>
    </div>
    )
}
export default ResetPass