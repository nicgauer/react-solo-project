import { useHistory } from 'react-router-dom';
import styles from './ArtistBubble.module.css'

const ArtistBubble = ({ artist }) => {

    const history = useHistory();

    const clickHandler = () => {
        history.push(`/${artist.customURL}`)
    }

    return (
        <div className={styles.container} onClick={clickHandler}>
            <img className={styles.artistImg} src={artist.pictureURL} alt={artist.name} />
            <h2 className={styles.artistName}>{artist.name}</h2>
        </div>
    )
}

export default ArtistBubble;