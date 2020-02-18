import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

const Header = props => {
    const user = useSelector(state => state.authenticationReducer);
console.log(user);
    return (
        <>
            <header>
                <div
                    className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
                    <h5 className="my-0 mr-md-auto font-weight-normal"><Link  to={'/'}>Test react app</Link></h5>
                    {!user.loggingIn ?
                        (
                            <>
                                <Link  to={'/registration'} className="btn btn-outline-primary">Регистрация</Link>&nbsp;&nbsp;
                                <Link  to={'/login'} className="btn btn-outline-primary" href="#">Войти</Link>
                            </>
                        )
                        :
                        (
                            <Link  to={'/logout'} className="btn btn-outline-primary" href="#">Выйти</Link>
                        )}
                </div>
            </header>
        </>
    )
}

export default Header