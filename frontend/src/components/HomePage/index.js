import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getOwnedArtists } from '../../store/artists';
import styles from './HomePage.module.css';
import ArtistBubble from '../ArtistBubble';
import { getUserFollows } from '../../store/follows';

const HomePage = () => {
    const user = useSelector((state) => state.session.user);
    const [artists, setArtists] = useState([]);
    const [follows, setFollows] = useState([]);

    useEffect(() => {
        (async () => {
            if(user){
                const list = await getOwnedArtists(user.id);
                const listTwo = await getUserFollows(user.id);
                if(list) setArtists(list.artists);
                if(listTwo) setFollows(listTwo.follows);
            }
        })()
    }, [])

    return (
        <div>
            {user && (
                <div className={styles.container}>
                    <div className={styles.userContainer}>
                        <h1>Welcome, {user.username}</h1>
                        <img className={styles.profileImage} src={user.pictureURL} alt={user.username} />
                    </div>
                    <h3>Your artists...</h3>
                        <div className={styles.bubbleContainer}>
                            {artists && artists.map(artist => <ArtistBubble key={artist.id} artist={artist} />)}
                        </div>
                    <h3>Followed artists...</h3>
                        <div className={styles.bubbleContainer}>
                        {follows && follows.map(follow => <ArtistBubble key={follow.id} artist={follow.Artist} />)}
                        </div>
                </div>
            )}

            {!user && (
                <div className={styles.loggedOutPage}>
                    <h1>Welcome to Soundcampify!</h1>
                    <h5>Please log in or sign up</h5>
                </div>
            )}
        </div>
    )
}

export default HomePage;