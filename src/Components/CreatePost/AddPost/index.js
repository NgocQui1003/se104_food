import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import CreatePost from "../../CreatePost";
import styles from './AddPost.module.scss';

import postApi from '../../../Api/postApi';
import ValidateInput from '../../../Utils/ValidateInput';
import HandleImage from '../../../Utils/HandleImage';

function Add() {

    const [selectedImage, setSelectedImage] = useState(null);
    const [open, setOpen] = useState(false);
    const history = useHistory();

    const [createPostValue, setCreatePostValue] = useState({
        postName: '',
        postDescription: '',
        ingredients: [
            {
                name: '',
                amount: '',
            }
        ],
        directions: [
            {
                step: '',
            }
        ],
        thumbnails: ''
    });

    let amountIngredients = createPostValue.ingredients.length;
    let amountSteps = createPostValue.directions.length;

    const [error, setError] = useState({
        postName: '',
        postDescription: '',
        ingredients: '',
        directions: '',
        thumbnails: '',
        createPost: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCreatePostValue({
            ...createPostValue,
            [name]: value
        });
        // console.log('Post value:',createPostValue);
    }

    const handleInputChange = (e, index) => {
        let ingredient = [...createPostValue.ingredients]
        ingredient[index][e.target.name] = e.target.value;
        setCreatePostValue({
            ...createPostValue,
            ingredients: ingredient
        });
        // console.log('Post value:',createPostValue);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        let ingredient = [...createPostValue.ingredients]
        ingredient.push({
            name: '',
            amount: '',
        });
        setCreatePostValue({
            ...createPostValue,
            ingredients: ingredient
        });
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        let ingredient = [...createPostValue.ingredients]
        ingredient.splice(index, 1);
        setCreatePostValue({
            ...createPostValue,
            ingredients: ingredient
        });
    };

    const handleInputStep = (e, index) => {
        let direction = [...createPostValue.directions]
        direction[index][e.target.name] = e.target.value;
        setCreatePostValue({
            ...createPostValue,
            directions: direction
        });
        // console.log('Post value:',createPostValue);
    };

    const handleAddStepClick = () => {
        let direction = [...createPostValue.directions]
        direction.push({
            step: '',
        });
        setCreatePostValue({
            ...createPostValue,
            directions: direction
        });
    };

    const handleRemoveStepClick = index => {
        let direction = [...createPostValue.directions]
        direction.splice(index, 1);
        setCreatePostValue({
            ...createPostValue,
            directions: direction
        });
    };

    const uploadImage = (e) => {
        let file = e.target.files[0];
        setSelectedImage(file);
        let url = URL.createObjectURL(e.target.files[0])
        // console.log(url);

        HandleImage.getBase64(file)
            .then(result => {
                setCreatePostValue({
                    ...createPostValue,
                    thumbnails: result
                });
            })
        // console.log('Post value:',createPostValue);
    }
    let isTrue = true;
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPostData = {
            title: createPostValue.postName,
            description: createPostValue.postDescription,
            ingredients: createPostValue.ingredients.map((item) => {
                const newValue = {
                    name: item.name,
                    quantity: item.amount
                }
                if (newValue.name === '' || newValue.quantity === '') {
                    alert("Điền đầy đủ thông tin nguyên liệu");
                    isTrue = false;
                }
                return newValue;
            }),
            directions: createPostValue.directions.map((item) => {
                if (item.step === '') {
                    alert("Điền đầy đủ thông tin các bước");
                    isTrue = false;
                }
                return item.step
            }),
            thumbnail_image: createPostValue.thumbnails,
        }

        if (isTrue) {
            const res = await postApi.createPost(newPostData);
            console.log(res);

            if (res.status === 1 && res.message === 'Add Success') {
                history.push(`/danh-sach-bai-dang`);
                setTimeout(function() { alert("Tạo bài viết thành công."); }, 1000);
            } else {
                setError({ ...error, createPost: res.message });
                    if (res.status === 0) {
                    alert("Tạo bài viết thất bại.")
                }
            }
        }
    }




    return (
        <>
            <div>
                <span className={styles['nav-links-mobile']} onClick={() => setOpen(true)}>Đăng bài viết</span>
                <CreatePost title="Thêm bài viết" onClose={() => setOpen(false)} open={open} onSubmit={handleSubmit}>

                    <form className={styles['post_form']} >

                        <div className={styles['row']}>
                            <div className={styles['col-25']}>
                                <label className={styles['post_label']} for="title">Tên món ăn:</label>
                            </div>
                            <div className={styles['col-75']}>
                                <input type="text"
                                    id="title"
                                    name="postName"
                                    value={createPostValue.postName}
                                    onChange={handleChange}
                                    placeholder="Cà chua xào trứng"
                                    onBlur={(e) => {
                                        let error = ValidateInput.createPostName(e.target.value);
                                        setError({
                                            ...error,
                                            postName: error
                                        });
                                    }} />
                            </div>
                            {error.postName == '' ? null :
                                <div className={styles['form-error']}>{error.postName}</div>
                            }
                        </div>

                        <div className={styles['row']}>
                            <div className={styles['col-25']}>
                                <label className={styles['post_label']} for="description">Mô tả: </label>
                            </div>
                            <div className={styles['col-75']}>
                                <textarea
                                    id="description"
                                    name="postDescription"
                                    value={createPostValue.postDescription}
                                    onChange={handleChange}
                                    placeholder="Cà chua xào với trứng..."
                                    onBlur={(e) => {
                                        let error = ValidateInput.createPostDescription(e.target.value);
                                        setError({
                                            ...error,
                                            postDescription: error
                                        });
                                    }} ></textarea>
                            </div>
                            {error.postDescription == '' ? null :
                                <div className={styles['form-error']}>{error.postDescription}</div>
                            }
                        </div>

                        <div className={styles['row']}>
                            <div className={styles['col-25']}>
                                <label className={styles['post_label']} for="material">Nguyên liệu: </label>
                            </div>
                            <div className={styles['col-75']}>
                                {createPostValue.ingredients.map((x, i) => {
                                    return (
                                        <div className={styles['box']}>
                                            <input
                                                className={styles['material']}
                                                name="name"
                                                placeholder="Nguyên liệu"
                                                // value={x.name}
                                                onChange={e => handleInputChange(e, i)}
                                                onBlur={(e) => {
                                                    let error = ValidateInput.createMaterialName(e.target.value);
                                                    setError({
                                                        ...error,
                                                        ingredients: error
                                                    });
                                                }}
                                            />
                                            <input
                                                className={styles['material']}
                                                name="amount"
                                                placeholder="Số lượng"
                                                // value={x.amount}
                                                onChange={e => handleInputChange(e, i)}
                                                onBlur={(e) => {
                                                    let error = ValidateInput.createMaterialName(e.target.value);
                                                    setError({
                                                        ...error,
                                                        ingredients: error
                                                    });
                                                }}
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
                                {error.ingredients == '' ? null :
                                    <div className={styles['error-form']}>{error.ingredients}</div>
                                }
                            </div>
                        </div>
                        <div className={styles['row']}>
                            <div className={styles['col-25']}>
                                <label className={styles['post_label']} for="description">Các bước làm: </label>
                            </div>
                            <div className={styles['col-75']}>
                                {createPostValue.directions.map((y, i) => {
                                    return (
                                        <div className={styles['box']}>
                                            <input
                                                className={styles['step']}
                                                name="step"
                                                placeholder="Hướng dẫn"
                                                value={y.step}
                                                onChange={e => handleInputStep(e, i)}
                                                onBlur={(e) => {
                                                    let error = ValidateInput.createStepName(e.target.value);
                                                    setError({
                                                        ...error,
                                                        directions: error
                                                    });
                                                }}
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
                                {error.directions == '' ? null :
                                    <div className={styles['error-form']}>{error.directions}</div>
                                }
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
                                    name="picture"
                                    onChange={uploadImage} />
                                <div>
                                    {selectedImage && (
                                        <div>
                                            <img className={styles['post_img']} alt="not fount" src={URL.createObjectURL(selectedImage)} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </form>
                </CreatePost>
            </div>
        </>
    )
}
export default Add;