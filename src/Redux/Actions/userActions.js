import { userContants } from "../Contants/userContants";


const setProfile = (profile) => {
    return {
        type: userContants.SET_PROFILE,
        data: profile,
    };
}

const logout = () => {
    return {
        type: userContants.LOGOUT,
    }
}

export const userActions = {
    setProfile,
    logout,
}
