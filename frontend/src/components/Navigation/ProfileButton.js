import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom'
import * as sessionActions from '../../store/session';
import * as artistActions from '../../store/artists';

import profileIcon from '../icons/icons8-user-26.png'

const ProfileButton = ({ user }) => {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const [artists, setArtists] = useState([]);

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

    useEffect(() => {
        (async () => {
            if(user){
                const ownedArtists = await artistActions.getOwnedArtists(user.id);
                if(ownedArtists) setArtists(ownedArtists.artists);
            }
        })()
    }, [])

    return(
        <>
            <button onClick={openMenu} className="nav__profile-button">
                <img className='nav__icon' src={profileIcon} title='Profile' />
            </button>
            {showMenu && (
                <ul className='profile-dropdown'>
                    <li>{user.username}</li>
                    <li>{user.email}</li>
                    {artists && 
                    artists.map(artist => <li key={artist.id}>
                        <NavLink to={`/${artist.customURL}`}>{artist.name}</NavLink>
                    </li>)}
                    <li>
                        <button onClick={logout} className='profile-dropdown__logout-button'>Log out</button>
                    </li>

                </ul>
            )}
        </>

    )
}

export default ProfileButton;