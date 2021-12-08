const ValidateInput = {
    email: (email) => {
        const re = /\S+@\S+\.\S+/;
        if (email.trim() === '') {
            return 'Vui lòng nhập email';
        }
        else if (!email.match(re)) {
            return 'Vui lòng nhập đúng định dạng email'
        }
    },

    userFirstName: (fName) => {
        if (fName.trim() === '') {
            return 'Vui lòng nhập Tên'
        } else return '';
    },

    userLastName: (lName) => {
        if (lName.trim() === '') {
            return 'Vui lòng nhập Họ';
        } else return '';
    },

    password: (password) => {
        const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (password.trim() === '') {
            return 'Vui lòng nhập password';
        }
        else if (password.match(re)) {
            return '';
        }
        else return 'Mật khẩu phải có tổi thiểu 8 kí tự, bao gồm chữ số và một số kí tự đặc biệt.';
    },
    validateConfPassWord: (checkingText, password) => {

        if (checkingText === '' && password !== '')
            return 'Vui lòng nhập lại password';
        else {
            if (checkingText !== password)
                return 'Sai password'
        }
    
        return '';
    },
}

export default ValidateInput;