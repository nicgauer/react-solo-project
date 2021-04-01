import styles from './ArtistSideBar.module.css';
import {useHistory} from 'react-router-dom';

const ArtistSideBar = ({ artist }) => {
    const history = useHistory();

    const clickHandler = () => {
        history.push(`/${artist.customURL}`)
    }

    return (
        <div className={styles.wrapper}>

            <div className={styles.bioContainer}>
                        <img className={styles.artistImage} onClick={clickHandler} src={artist.pictureURL} alt={artist.name} />     
                        <h3 className={styles.artistName}>{artist.name}</h3>
                        <p className={styles.artistLocation}>{artist.location}</p>
                        <button className={styles.follow}>Follow</button>
            </div>
                        <pre className={styles.artistBio}>{artist.bio}</pre>
        </div>
    )
}

export default ArtistSideBar;