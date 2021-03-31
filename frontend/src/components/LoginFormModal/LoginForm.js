import React, { useState } from 'react'
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux'

import styles from './LoginForm.module.css';
import confirmIcon from '../icons/icons8-checked-26.png';
import cancelIcon from '../icons/icons8-delete-26.png';


const LoginForm = () => {
    const dispatch = useDispatch();
    // const sessionUser = useSelector(state => state.session.user);
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
        <div className={styles.container}>
            <form className={styles.form} onSubmit={submitHandler}>
                <h2 className={styles.header}>Log In</h2>
                <ul>
                    {errors.map((error) => <li key={error}>{error}</li>)}
                </ul>
                <label className={styles.label}>
                    Username or Email
                    <input type="text" value={credential} onChange={credentialHandler} className='login__username login__input' />
                    {credentialError ? <p className={styles.errorText}>{credentialError}</p> : null}
                </label>
                
                <label className={styles.label}>
                    Password
                    <input type="password" value={password} onChange={passwordHandler} className='login__password login__input' />
                    {passwordError ? <p className={styles.errorText}>{passwordError}</p> : null}
                </label>
                <div className={styles.buttonContainer}>
                    <button type="submit" className={styles.button}>
                        <img src={confirmIcon} className={styles.icon} title='log in' alt='login' />
                    </button>
                    <button type="button" className={styles.button} onClick={cancelHandler}>
                        <img src={cancelIcon} className={styles.icon} title='Cancel' alt='cancel' />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm;