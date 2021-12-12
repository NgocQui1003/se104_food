import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './UpdatePost.module.scss';
import UserMenu from '../../Components/UserMenu';
import NotLoggedIn from '../../Components/NotLoggedIn';
import postApi from '../../Api/postApi';
import ValidateInput from '../../Utils/ValidateInput';
import HandleImage from '../../Utils/HandleImage';


function UpdatePost() {
    const { loggedIn, user } = useSelector(state => state.User);
    const history = useHistory();
    const { _id } = useParams();

    const [selectedImage, setSelectedImage] = useState(null);

    const [updatePostValue, setUpdatePostValue] = useState({
        title: '',
        description: '',
        ingredients: [
            {
                name: '',
                quantity: '',
            }
        ],
        directions: [
            {
                description: '',
            }
        ],
        thumbnail_image: ''
    });

    let amountIngredients = updatePostValue.ingredients.length;
    let amountSteps = updatePostValue.directions.length;

    const [error, setError] = useState({
        title: '',
        description: '',
        ingredients: '',
        directions: '',
        thumbnail_image: '',
        updatePost: ''
    });

    const fetchData = async () => {
        const res = await postApi.getPostDetail(_id);
        console.log("Response: ", res);
        setUpdatePostValue(res.data);
        setSelectedImage(res.data.thumbnail_image);
    }

    // fetch data
    useEffect(() => {
        fetchData();
        document.title = 'Chỉnh sửa bài viết | Nom Nom'
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatePostValue({
            ...updatePostValue,
            [name]: value
        });
        console.log('Post value:', updatePostValue);
    }

    const handleInputChange = (e, index) => {
        let ingredient = [...updatePostValue.ingredients]
        ingredient[index][e.target.name] = e.target.value;
        setUpdatePostValue({
            ...updatePostValue,
            ingredients: ingredient
        });
        // console.log('Post value:',updatePostValue);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        let ingredient = [...updatePostValue.ingredients]
        ingredient.push({
            name: '',
            amount: '',
        });
        setUpdatePostValue({
            ...updatePostValue,
            ingredients: ingredient
        });
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        let ingredient = [...updatePostValue.ingredients]
        ingredient.splice(index, 1);
        setUpdatePostValue({
            ...updatePostValue,
            ingredients: ingredient
        });
    };

    const handleInputStep = (e, index) => {
        let direction = [...updatePostValue.directions]
        direction[index][e.target.name] = e.target.value;
        setUpdatePostValue({
            ...updatePostValue,
            directions: direction
        });
        // console.log('Post value:',updatePostValue);
    };

    const handleAddStepClick = () => {
        let direction = [...updatePostValue.directions]
        direction.push({
            step: '',
        });
        setUpdatePostValue({
            ...updatePostValue,
            directions: direction
        });
    };

    const handleRemoveStepClick = index => {
        let direction = [...updatePostValue.directions]
        direction.splice(index, 1);
        setUpdatePostValue({
            ...updatePostValue,
            directions: direction
        });
    };

    const uploadImage = (e) => {
        let file = e.target.files[0];
        let url = URL.createObjectURL(e.target.files[0])
        setSelectedImage(url);

        HandleImage.getBase64(file)
            .then(result => {
                setUpdatePostValue({
                    ...updatePostValue,
                    thumbnail_image: result
                });
            })
        // console.log('Post value:',updatePostValue);
    }
    let isTrue = true;
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPostData = {
            title: updatePostValue.title,
            description: updatePostValue.description,
            ingredients: updatePostValue.ingredients.map((item) => {
                const newValue = {
                    name: item.name,
                    quantity: item.quantity
                }
                if (newValue.name === '' || newValue.quantity === '') {
                    alert("Điền đầy đủ thông tin nguyên liệu");
                    isTrue = false;
                }
                return newValue;
            }),
            directions: updatePostValue.directions.map((item) => {
                if (item.description === '') {
                    alert("Điền đầy đủ thông tin các bước");
                    isTrue = false;
                }
                return item.description
            }),
            thumbnail_image: updatePostValue.thumbnail_image,
        }

        if (isTrue) {
            const res = await postApi.updatePost(_id, newPostData);
            console.log('Response: ', res);
            if (res.status === 1 && res.message === 'Update Success') {
                history.push(`/bai-dang/${_id}`);
                setTimeout(function () { alert("Đổi thông tin bài viết thành công."); }, 1000);
            } else {
                setError({ ...error, updatePost: res.message });
                if (res.status === 0) {
                    history.push(`/danh-sach-bai-dang`);
                    setTimeout(function () { alert("Đổi thông tin bài viết thất bại."); }, 1000);
                }
            }
        }
    }

    return user && loggedIn && updatePostValue ? (
        <div className={[styles['InformationUser-container']].join(' ')}>
            <UserMenu user={user} />
            <div className={styles['InformationUser-container-format']}>
                <h1 className={styles['ModifyInformation-container-tile']}>Đổi Thông Tin Bài viết</h1>
                <form className={styles['post_form']} >
                    <div className={styles['row']}>
                        <div className={styles['col-25']}>
                            <label className={styles['post_label']} for="title">Tên món ăn:</label>
                        </div>
                        <div className={styles['col-75']}>
                            <input type="text"
                                id="title"
                                name="title"
                                value={updatePostValue.title}
                                onChange={handleChange}
                                placeholder="Cà chua xào trứng"
                                onBlur={(e) => {
                                    let error = ValidateInput.createPostName(e.target.value);
                                    setError({
                                        ...error,
                                        title: error
                                    });
                                }} />
                        </div>
                        {error.title == '' ? null :
                            <div className={styles['form-error']}>{error.title}</div>
                        }
                    </div>

                    <div className={styles['row']}>
                        <div className={styles['col-25']}>
                            <label className={styles['post_label']} for="description">Mô tả: </label>
                        </div>
                        <div className={styles['col-75']}>
                            <textarea
                                id="description"
                                name="description"
                                value={updatePostValue.description}
                                onChange={handleChange}
                                placeholder="Cà chua xào với trứng..."
                                onBlur={(e) => {
                                    let error = ValidateInput.createPostDescription(e.target.value);
                                    setError({
                                        ...error,
                                        description: error
                                    });
                                }} ></textarea>
                        </div>
                        {error.description == '' ? null :
                            <div className={styles['form-error']}>{error.description}</div>
                        }
                    </div>

                    <div className={styles['row']}>
                        <div className={styles['col-25']}>
                            <label className={styles['post_label']} for="material">Nguyên liệu: </label>
                        </div>
                        <div className={styles['col-75']}>
                            {updatePostValue.ingredients.map((x, i) => {
                                return (
                                    <div className={styles['box']}>
                                        <input
                                            className={styles['material']}
                                            name="name"
                                            placeholder="Nguyên liệu"
                                            value={x.name}
                                            onChange={e => handleInputChange(e, i)}
                                        />
                                        <input
                                            className={styles['material']}
                                            name="quantity"
                                            placeholder="Số lượng"
                                            value={x.quantity}
                                            onChange={e => handleInputChange(e, i)}
                                        />
                                        <div className={styles['btn-box']}>
                                            {amountIngredients !== 1 && <button
                                                className={styles['btn-remove']}
                                                onClick={() => handleRemoveClick(i)}>Xóa</button>}
                                            {amountIngredients - 1 === i && <button
                                                className={styles['btn-add']}
                                                onClick={handleAddClick}>Thêm</button>}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className={styles['row']}>
                        <div className={styles['col-25']}>
                            <label className={styles['post_label']} for="description">Các bước làm: </label>
                        </div>
                        <div className={styles['col-75']}>
                            {updatePostValue.directions.map((y, i) => {
                                return (
                                    <div className={styles['box']}>
                                        <input
                                            className={styles['step']}
                                            name="description"
                                            placeholder="Hướng dẫn"
                                            value={y.description}
                                            onChange={e => handleInputStep(e, i)}
                                        />
                                        <div className={styles['btn-box']}>
                                            {amountSteps !== 1 && <button
                                                className={styles['btn-remove']}
                                                onClick={() => handleRemoveStepClick(i)}>Xóa</button>}
                                            {amountSteps - 1 === i && <button
                                                className={styles['btn-add']}
                                                onClick={handleAddStepClick}>Thêm</button>}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className={styles['row']}>
                        <div className={styles['col-25']}>
                            <label className={styles['post_label']} for="title">Hình ảnh: </label>
                        </div>
                        <div className={styles['col-75']}>
                            <input
                                type="file"
                                id="image"
                                name="thumbnail_image"
                                onChange={uploadImage} />
                            <div>
                                <img className={styles['post_img']} alt="not found" src={selectedImage} />
                            </div>
                        </div>
                    </div>
                    <div className={styles["ModifyInformation-button"]}>
                        <div className={styles["ModifyInformation-cancel"]}>
                            <input className={styles["ModifyInformation-button-cancel"]} type="submit" value="Hủy" />
                        </div>
                        <div className={styles["ModifyInformation-confirm"]}>
                            <input className={styles["ModifyInformation-button-confirm"]} type="submit" value="Xác nhận"
                                onClick={handleSubmit} />
                        </div>
                    </div>
                </form>
            </div>
        </div >
    ) : <NotLoggedIn />
}

export default UpdatePost;