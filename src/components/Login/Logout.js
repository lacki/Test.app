import React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from "react-router-dom";

import {userConstants} from '../../constants';

const Logout = () => {
    const dispatch = useDispatch()

    dispatch({ type: userConstants.LOGOUT, user: {}});

    return (
        <>
            <Redirect to={`/`} />
        </>
    )
}

export default Logout;