import React, { useState } from 'react'
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom';
import './LoginForm.css';
import confirmIcon from '../icons/icons8-checked-26.png';
import cancelIcon from '../icons/icons8-delete-26.png';


const LoginFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if(sessionUser) return (
        <Redirect to='/' />
    )

    const credentialHandler = (e) => {
        setCredential(e.target.value);
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        setErrors([])
        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                if(data && data.errors) setErrors(data.errors)
            })
    }

    const cancelHandler = () => {
        //TO DO -- redirect home 
        console.log('TO DO -- redirect home');
    }

    return (
        <div className='page-container'>
            <form className='login-form' onSubmit={submitHandler}>
                <h2 className='header'>Log In</h2>
                <ul>
                    {errors.map((error) => <li key={error}>{error}</li>)}
                </ul>
                <label className='label'>
                    Username or Email
                    <input type="text" value={credential} onChange={credentialHandler} className='username-input' />
                </label>
                
                <label className='label'>
                    Password
                    <input type="password" value={password} onChange={passwordHandler} className='password-input' />
                </label>
                <div className='button-container'>
                    <button type="submit" className="submit button">
                        <img src={confirmIcon} className='icon' title='log in' />
                    </button>
                    <button type="button" className="cancel button" onClick={cancelHandler}>
                        <img src={cancelIcon} className='icon' title='Cancel' />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default LoginFormPage;