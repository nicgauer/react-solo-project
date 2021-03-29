import React, { useState } from 'react'
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux'

import './LoginForm.css';
import confirmIcon from '../icons/icons8-checked-26.png';
import cancelIcon from '../icons/icons8-delete-26.png';


const LoginForm = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [credentialError, setCredentialError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    
    const validation = () => {
        setCredentialError('');
        setPasswordError('');
        if(credential.length < 1) setCredentialError('Please enter your email or username')
        if(password.length < 6) setPasswordError('Passwords must be at least 6 characters')
    }


    const credentialHandler = (e) => {
        setCredential(e.target.value);
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        validation();
        setErrors([])
        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                if(data && data.errors) setErrors(data.errors)
            })
    }

    const cancelHandler = () => {
        //TO DO -- redirect home 
    }

    return (
        <div className='login__page-container'>
            <form className='login__form' onSubmit={submitHandler}>
                <h2 className='login__header'>Log In</h2>
                <ul>
                    {errors.map((error) => <li key={error}>{error}</li>)}
                </ul>
                <label className='login__label'>
                    Username or Email
                    <input type="text" value={credential} onChange={credentialHandler} className='login__username login__input' />
                    {credentialError ? <p className='login__error-text'>{credentialError}</p> : null}
                </label>
                
                <label className='login__label'>
                    Password
                    <input type="password" value={password} onChange={passwordHandler} className='login__password login__input' />
                    {passwordError ? <p className='login__error-text'>{passwordError}</p> : null}
                </label>
                <div className='login__button-container'>
                    <button type="submit" className="login__submit login__button">
                        <img src={confirmIcon} className='login__icon' title='log in' alt='login' />
                    </button>
                    <button type="button" className="login__cancel login__button" onClick={cancelHandler}>
                        <img src={cancelIcon} className='login__icon' title='Cancel' alt='cancel' />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm;