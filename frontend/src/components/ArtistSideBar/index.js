import styles from './ArtistSideBar.module.css';
import {useHistory} from 'react-router-dom';

const ArtistSideBar = ({ artist }) => {
    const history = useHistory();

    const clickHandler = () => {
        history.push(`/${artist.customURL}`)
    }

    return (
        <div className={styles.bioContainer} onClick={clickHandler}>
                    <img className={styles.artistImage} src={artist.pictureURL} alt={artist.name} />     
                    <h3>{artist.name}</h3>
                    <pre className={styles.artistBio}>{artist.bio}</pre>
        </div>
    )
}

export default ArtistSideBar;