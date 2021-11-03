const Auth = {
    getToken: () => {
        return localStorage.getItem('token');
    },
    
    setToken: (token) => {
        localStorage.setItem('token', token);
    },
}

export default Auth;