import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

import profileIcon from '../icons/icons8-user-26.png'

const ProfileButton = ({ user }) => {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if(showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if(!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        }
        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const logout = e => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    }

    return(
        <>
            <button onClick={openMenu} className="nav__profile-button">
                <img className='nav__icon' src={profileIcon} title='Profile' />
            </button>
            {showMenu && (
                <ul className='profile-dropdown'>
                    <li>{user.username}</li>
                    <li>{user.email}</li>
                    <li>
                        <button onClick={logout} className='profile-dropdown__logout-button'>Log out</button>
                    </li>

                </ul>
            )}
        </>

    )
}

export default ProfileButton;