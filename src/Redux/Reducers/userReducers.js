import { userContants } from "../Contants/userContants";

let user = JSON.parse(localStorage.getItem('user'));

const initialState = {};

const User = (state = initialState, action) => {
    switch (action.type) {
        case userContants.SET_PROFILE: 
            return {
                loggedIn: true,
                user: action.data,
            };
        case userContants.LOGOUT:
            return {};
        default:
            return state;
    }
}

export default User;