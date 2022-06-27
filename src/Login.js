import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { emailValidator, passwordValidator, passwordSumValidator } from './Helpers/Helpers';
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState({ msg: '', status: '' });
    const [passwordHideShow, setPasswordHideShow] = useState(false);
    const navigate = useNavigate();
    const onSubmitHandler = () => {
        if(email !== '' && password !== ''){
            let emailValidationToken = emailValidator(email);
            let passwordValidationToken = passwordValidator(password);
            let passwordSumValidationToken = passwordSumValidator(password);
            if (emailValidationToken === 'valid') {
                if (passwordValidationToken === true) {
                    if (passwordSumValidationToken === true) {
                        navigate('/home');
                    } else {
                        setAlert({ msg: 'Password Character Sum Must Be 10', status: 'danger' });
                    }
                } else {
                    setAlert({ msg: 'Password Must Be Numeric!!! ', status: 'danger' });
                }
            } else {
                setAlert({ msg: 'Invalid Email Address!!!', status: 'danger' });
            }
        }else{
            setAlert({ msg: 'Email and Password Fields are Mandatory!!!', status: 'danger' });
        }
   

    }
    return (
        <div className='container d-flex justify-content-center login-form-container w-100'>
            <div className='login-form'>
                <Form>
                    <h3 className='text-center mb-4'>Login</h3>
                    {alert.msg !== '' ? <Alert className='small' key={alert.status} variant={alert.status} onClose={() => setAlert({ msg: '', status: '' })} dismissible>{alert.msg} </Alert> : ''}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3 position-relative" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control maxLength='10' type={passwordHideShow === true ? 'text' : 'password'} placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <span className='password-eye-container'>
                            {
                                passwordHideShow !== true ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16" onClick={() => setPasswordHideShow(true)}>
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16" onClick={() => setPasswordHideShow(false)}>
                                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                                        <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                                    </svg>
                            }
                        </span>
                        <p className='small-custom text-danger'> Password Result must be 10 after adding all character!</p>
                    </Form.Group>

                    <Button variant="primary" type="button" onClick={onSubmitHandler}> Submit</Button>
                </Form>
            </div>
        </div>
    );
};

export default Login;