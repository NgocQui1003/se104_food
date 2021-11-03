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

    userName: (userName) => {
        if (userName.trim() === '') {
            return 'Vui lòng nhập đầy đủ Họ tên'
        } else return '';
    },

    password: (password) => {
        const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (password.trim() === '') {
            return 'Vui lòng nhập password';
        }
        else if (!password.match(re) || password.length < 8) {
            return 'Mật khẩu phải có tổi thiểu 8 kí tự, bao gồm chữ số và một số kí tự đặc biệt.';
        }
        else return ''
    },

}

export default ValidateInput;