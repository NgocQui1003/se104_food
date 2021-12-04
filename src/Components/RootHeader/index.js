import React, { useState } from 'react'
import { useLocation, useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';

import HeaderHomepage from '../HeaderHomepage';
import Header from '../Header';
function RootHeader() {
    const userState = useSelector((state) => state.User);
    const location = useLocation();
    return (
        <div>
            {location.pathname === '/'
                ? <HeaderHomepage 
                    loggedIn={userState.loggedIn} 
                    user={userState.user} 
                />
                : <Header 
                    loggedIn={userState.loggedIn} 
                    user={userState.user} 
                />}
        </div>
    )
}

export default RootHeader
