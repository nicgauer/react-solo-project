import {followButton, findFollow} from '../../store/follows';
import { useState, useEffect } from 'react';


const FollowButton = ({ userId, artistId }) => {
    const [followString, setFollowString] = useState('Follow')

    useEffect(() => {
        (async () => {
            const follow = await findFollow(userId, artistId);
            if(follow){
                setFollowString('Unfollow');
            }
        })();
    })

    const clickHandler = async () => {
        if(followString === 'Follow'){
            setFollowString('Unfollow');
        }else{
            setFollowString('Follow');
        }
        const follow = await followButton(userId, artistId);
    }

    return (
        <button onClick={clickHandler}>
            {followString}
        </button>
    )
}

export default FollowButton;