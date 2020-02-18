import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { userConstants } from "../../constants";

import { Form, Formik } from 'formik';
import * as Yup from "yup";
import { TextInput } from '../Partials/TextInput';

const Login = (loginProps) => {
    const dispatch = useDispatch();

    const [notRegister, setNotRegister] = useState(false);
    const [registerMessage, setRegisterMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [goToProfile, setGoToProfile] = useState(false);
    const [errorEmpty, setErrorEmpty] = useState('Поле не может быть пустым');

    return (
        <>
            {goToProfile ? <Redirect to={`/`} /> : null}
            <div className={`create_account_form ${isLoading ? 'disable-content' : ''}`}>
                <h2>Войти в учетную запись</h2>

                {notRegister && (
                    <div className="alert alert-danger">{registerMessage}</div>
                )}
                <div className="row">
                    <div className="col-lg-6">
                        <Formik
                            initialValues={{
                                username: '',
                                password: ''
                            }}
                            onSubmit={(values, actions) => {
                                setIsLoading(true);
                                setNotRegister(false);
                                const sendData = async () => {
                                    setIsLoading(true)
                                    const user = await loginUser(values);
                                    if (!user.success) {
                                        setNotRegister(true);
                                        setRegisterMessage(user.message);
                                        setIsLoading(false);
                                    } else {
                                        setIsLoading(false);
                                        setGoToProfile(true);
                                        dispatch({ type: userConstants.LOGIN_SUCCESS, user: user});
                                    }
                                }

                                sendData();
                                setIsLoading(false);
                            }}
                            validationSchema={Yup.object().shape({
                                password: Yup.string().required(errorEmpty),
                                username: Yup.string().required(errorEmpty)
                            })}
                        >
                            {props => {
                                const { values, touched, errors, handleChange, handleBlur } = props;

                                return (
                                    <>
                                        <Form className="registration-form login-form">
                                            <TextInput name="username" type="text" label={`Username`} />

                                            <TextInput name="password" type="password" label={`Пароль`} />

                                            <div className="input-group">
                                                <button
                                                    type="submit"
                                                    className="btn btn-info hvr-sweep-to-top"
                                                    value="Отправить"
                                                >Отправить</button>
                                            </div>
                                        </Form>
                                    </>
                                );
                            }}
                        </Formik>
                    </div>
                </div>
            </div>
        </>

    );
}

const loginUser = async (data) => {
    console.log(data);
    const results = await axios.post(`http://smktesting.herokuapp.com/api/login/ `, {
        username: data.username,
        password: data.password
    });
    return results.data
}

export default Login