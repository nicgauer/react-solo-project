import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';

import home from '../icons/icons8-home-24.png'

import styles from './Navigation.module.css';

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
            <div className={styles.sessionContainer}>
                <LoginFormModal />
                <NavLink to='/signup' className={styles.signUp}>Sign up</NavLink>
            </div>
            </>
        )
    }
    return (
        <nav className={styles.container}>
            <div className={styles.navBar}>
                    <NavLink className={styles.home} exact to='/'>
                        <img className={styles.homeIcon} src={home} alt={'home'} title='Home' />
                    </NavLink>
                {isLoaded && sessionLinks}
            </div>
        </nav>
    )
}

export default Navigation;