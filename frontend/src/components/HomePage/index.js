import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getOwnedArtists } from '../../store/artists';
import styles from './HomePage.module.css';
import ArtistBubble from '../ArtistBubble';

const HomePage = () => {
    const user = useSelector((state) => state.session.user);
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        (async () => {
            const list = await getOwnedArtists(user.id);
            if(list) setArtists(list.artists);
        })()
    }, [])

    return (
        <div>
            {user && (
                <div>
                    <h1>Welcome, {user.username}</h1>
                    <img src={user.pictureURL} />
                    <h3>Your artists...</h3>
                        <div className={styles.bubbleContainer}>
                            {artists && artists.map(artist => <ArtistBubble key={artist.id} artist={artist} />)}
                        </div>
                </div>
            )}
        </div>
    )
}

export default HomePage;