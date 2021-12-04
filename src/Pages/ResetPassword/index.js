import React, { useState } from "react";
import axios from 'axios';
import { useParams} from 'react-router-dom'

import styles from './ResetPassword.module.scss';

function ResetPassword() {
    const localhost = 'http://localhost:3000/';
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

    const resetPassword = async ({token, password}) => {
        console.log(token, password);
        const URL = localhost + `user/reset-password/${token}`
        console.log(URL);
        return await axios.post(URL, {password})
    }
    const submitHandler = e => {
        //
    }

    const validatePassWord = text => {
        const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (text === '')
            return 'Vui lòng nhập password';
        else {
            if (!text.match(re))
                return 'Mật khẩu phải có ít nhất 8 ký tự, trong đó có chứa ít nhất 1 số và 1 chữ cái'
            else return ''
        }
    }
    const validateConfPassWord = (checkingText, password) => {

        if (checkingText === '' && password !== '')
            return 'Vui lòng nhập lại password';
        else {
            if (checkingText !== password)
                return 'Sai password'
        }
    
        return '';
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
                        let err = validatePassWord(e.target.value);
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
                            let err = validateConfPassWord(e.target.value, resetPass.password);
                            setError({ ...error, confirmPassword: err })    
                        }
                    }}
                    onBlur={(e) => {
                        let err = validateConfPassWord(e.target.value, resetPass.password);
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
export default ResetPassword;