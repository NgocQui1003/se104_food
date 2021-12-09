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
        return '';
        const re = '/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/';
        if (password.trim() === '') {
            return 'Vui lòng nhập password';
        }
        else if (!password.match(re) || password.length < 8) {
            return 'Mật khẩu phải có tổi thiểu 8 kí tự, bao gồm chữ số và một số kí tự đặc biệt.';
        }
        else return ''
    },

    createPostName: (pName) => {
        if (pName.trim() === '') {
            return 'Vui lòng nhập tên bài viết';
        } else return '';
    },

    createPostDescription: (pDescription) => {
        if (pDescription.trim() === '') {
            return 'Vui lòng nhập mô tả bài viết';
        } else return '';
    },

    createMaterialName: (pIngredients) => {
        if (pIngredients.trim() === '') {
            return 'Vui lòng nhập đủ các nguyên liệu';
        } else return '';
    },

    createStepName: (pDirections) => {
        if (pDirections.trim() === '') {
            return 'Vui lòng nhập đủ các bước làm';
        } else return '';
    },

}

export default ValidateInput;