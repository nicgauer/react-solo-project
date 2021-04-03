import styles from './ArtistSideBar.module.css';
import {useHistory} from 'react-router-dom';
import FollowButton from '../FollowButton';

const ArtistSideBar = ({ artist, userId }) => {
    const history = useHistory();
    const followers = artist.Follows;
    let currentUserFollowing = false;

    if(userId){
        const followerIds = followers.map(follow => follow.userId);
        currentUserFollowing = followerIds.includes(userId);
    }

    const clickHandler = () => {
        history.push(`/${artist.customURL}`)
    }

    return (
        <div className={styles.wrapper}>

            <div className={styles.bioContainer}>
                        <img className={styles.artistImage} onClick={clickHandler} src={artist.pictureURL} alt={artist.name} />     
                        <h3 className={styles.artistName}>{artist.name}</h3>
                        <p className={styles.artistLocation}>{artist.location}</p>
                        {userId && (<FollowButton artistId={artist.id} userId={userId} CUF={currentUserFollowing} />)}
            </div>
                        <pre className={styles.artistBio}>{artist.bio}</pre>
        </div>
    )
}

export default ArtistSideBar;