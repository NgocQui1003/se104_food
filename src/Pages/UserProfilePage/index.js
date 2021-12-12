import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import styles from './UserProfile.module.scss';

// components
import AdminMenu from '../../Components/AdminMenu';
import NotLoggedIn from '../../Components/NotLoggedIn';
import UserProfile from '../../Components/UserProfile';

// mui
import CircularProgress from '@mui/material/CircularProgress';
import adminApi from '../../Api/adminApi';


function UserProfilePage() {
    const { user, loggedIn } = useSelector(state => state.User);
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState({});
    const { id } = useParams();
    let isAdmin;
    if (user) {
        if (user.role && user.role.role_name === 'admin') {
            isAdmin = true;
        }
    } else {
        isAdmin = false;
    }

    const fetchUserData = async () => {
        setLoading(true);
        const response = await adminApi.getUserProfile(id);
        if (response.data) {
            setProfile(response.data);
        }
        setLoading(false);
    }

    const Loading = () => (
        <div className={styles['container-loading']}>
            <CircularProgress />
            <p>Đang tải danh sách bạn đã lưu</p>
        </div>
    )

    useEffect(() => {
        fetchUserData();
        document.title = 'Admin'
    }, [])


    return user && loggedIn && isAdmin ? (
        <>
            {
                loading ? <Loading /> : (
                    <div className={styles['container']}>
                        <AdminMenu user={user} />
                        <UserProfile profile={profile} />
                    </div>
                )
            }
        </>
    ) : <NotLoggedIn />
}

export default UserProfilePage;