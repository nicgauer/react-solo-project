import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom'
import * as sessionActions from '../../store/session';
import * as artistActions from '../../store/artists';

import styles from './ProfileButton.module.css';

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
    }, [user])

    return(
        <div className={styles.container}>
            <button onClick={openMenu} className={styles.profileButton}>
                <img className={styles.profileIcon} src={profileIcon} title='Profile' alt='profile' />
            </button>
            {showMenu && (
                <div className={styles.profileDropdownWindow}>
                    <ul className={styles.profileDropdown}>
                        <li>{user.username}</li>
                        <li>{user.email}</li>
                        {artists && 
                        artists.map(artist => <li key={artist.id}>
                            <NavLink to={`/${artist.customURL}`}>{artist.name}</NavLink>
                        </li>)}
                        <li>
                            <NavLink to='/new-artist'>
                                <button className={styles.button}>Create New Artist</button>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to='/new-release'>
                                <button className={styles.button}>Create New Release</button>
                            </NavLink>
                        </li>

                        <li>
                            <button className={styles.button} onClick={logout}>Log out</button>
                        </li>

                    </ul>
                </div>
            )}
        </div>

    )
}

export default ProfileButton;