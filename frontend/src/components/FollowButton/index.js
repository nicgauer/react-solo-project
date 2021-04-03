import {followButton, findFollow} from '../../store/follows';
import { useState, useEffect } from 'react';

import styles from './FollowButton.module.css';


const FollowButton = ({ userId, artistId, CUF }) => {
    const [followString, setFollowString] = useState('Follow')

    useEffect(() => {
        if(CUF){
            setFollowString('Unfollow');
        }
    }, [])

    const clickHandler = async () => {
        if(followString === 'Follow'){
            setFollowString('Unfollow');
        }else{
            setFollowString('Follow');
        }
        const follow = await followButton(userId, artistId);
    }

    return (
        <button className={styles.follow} onClick={clickHandler}>
            {followString}
        </button>
    )
}

export default FollowButton;