import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './SignUpForm.css';
import confirmIcon from '../icons/icons8-checked-26.png';
import cancelIcon from '../icons/icons8-delete-26.png';


const SignUpFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [email, setEmail] = useState('');
    const [emailErrors, setEmailErrors] = useState([]);
    const [username, setUsername] = useState('');
    const [usernameErrors, setUsernameErrors] = useState([]);
    const [password, setPassword] = useState('');
    const [passwordErrors, setPasswordErrors] = useState([]);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const [image, setImage] = useState(null);
    
    if(sessionUser) return (
        <Redirect to='/' />
    )

    const validation = () => {
        let emailErr = [];
        let usernameErr = [];
        let passwordErr = [];

        if(email.length < 1) emailErr.push('Please provide an email.');
        if(email.length > 0 && !validateEmail(email)) emailErr.push('Not a valid email.');

        if(validateEmail(username)) usernameErr.push('Username cannot be an email.');
        if(username.length < 4) usernameErr.push('Username must be at least 4 characters.');
        if(username.length > 30) usernameErr.push('Username must be less than 30 characters.');

        if(!passwordStrength()) passwordErr.push('Password requires a number, capital letter, and a special character and must be between 6 and 30 characters long')
        if(password !== confirmPassword) passwordErr.push('Password and Confirm Password must match!');

        setEmailErrors(emailErr);
        setUsernameErrors(usernameErr);
        setPasswordErrors(passwordErr);
    }

    const validateEmail = (string) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(String(string).toLowerCase());
    }

    const passwordStrength = () => {
        const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,30}$/
        return re.test(String(password).toLowerCase());
    }

    const emailHandler = (e) => {
        setEmail(e.target.value);
    }

    const usernameHandler = (e) => {
        setUsername(e.target.value);
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value);
    }
    
    const confirmPasswordHandler = (e) => {
        setConfirmPassword(e.target.value);
    }

    const updateFile = (e) => {
        const file = e.target.files[0];
        if(file) setImage(file);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        validation();
        if(password === confirmPassword){
            setErrors([]);
            return dispatch(sessionActions.createUser({ username, email, password, image }))
            .catch(async (res) => {
                const data = await res.json();
                if(data && data.errors) setErrors(data.errors);
            })
        }
        return setErrors(['Confirm password must match Password!']);
    }

    return(
        <div className="signup__page-container">
            <form className="signup__form" onSubmit={submitHandler}>
                <h2 className="signup__header">Sign Up</h2>
                <label className="signup__label">
                    Email
                    <input 
                        type='email' 
                        value={email} 
                        onChange={emailHandler} 
                        className="email signup__input"
                    />
                    {emailErrors.map(error => <p className="signup__error-text" key={error}>{error}</p>)}
                </label>

                <label className="signup__label">
                    Username
                    <input 
                        type='text' 
                        value={username} 
                        onChange={usernameHandler} 
                        className="username signup__input"
                    />
                    {usernameErrors.map(error => <p className="signup__error-text" key={error}>{error}</p>)}
                </label>

                <label className="signup__label">
                    Password
                    <input 
                        type='password' 
                        value={password} 
                        onChange={passwordHandler} 
                        className="password signup__input"
                    />
                    {passwordErrors.map(error => <p className="signup__error-text" key={error}>{error}</p>)}
                </label>

                <label className="signup__label">
                    Confirm Password
                    <input 
                        type='password' 
                        value={confirmPassword} 
                        onChange={confirmPasswordHandler} 
                        className="password signup__input"
                    />
                </label>

                <label className="signup__label">
                    Profile Picture
                    <input type="file" onChange={updateFile} />
                </label>

                <div className='signup__button-container'>
                    <button 
                        type='submit' 
                        className='signup__submit signup__button'
                        >
                            <img 
                                src={confirmIcon} 
                                className='signup__icon'
                                title='Sign up'
                            />
                    </button>

                    <button 
                        type='button' 
                        className='signup__submit signup__button'
                        >
                            <img 
                                src={cancelIcon} 
                                className='signup__icon'
                                title='Cancel'
                            />
                    </button>


                </div>

            </form>
        </div>
    )
}

export default SignUpFormPage;