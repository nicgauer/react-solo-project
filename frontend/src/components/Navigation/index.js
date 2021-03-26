import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

const Navigation = ({ isLoaded }) => {
    const sessionUser = useSelector(state => state.session.user);
    
    let sessionLinks;
    if(sessionUser){
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    }else {
        sessionLinks = (
            <>
                <LoginFormModal />
                <NavLink to='/signup' className='nav-bar__link'>Sign up</NavLink>
            </>
        )
    }
    return (
        <nav className='nav-bar'>
            <ul>
                <li>
                    <NavLink exact to='/' className='nav-bar__link'>Home</NavLink>
                    {isLoaded && sessionLinks}
                </li>
            </ul>
        </nav>
    )
}

export default Navigation;