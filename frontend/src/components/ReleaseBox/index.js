import { useHistory } from 'react-router-dom';
import styles from './ReleaseBox.module.css';

const ReleaseBox = ({ release, artist }) => {
    const history = useHistory();
    const clickHandler = () => {
        history.push(`/${artist.customURL}/${release.releaseURL}`)
    }
    return(
        <div className={styles.container} onClick={clickHandler}>
            <img className={styles.image} src={release.coverURL} alt={release.name} />
            <h3 className={styles.artistName}>{release.name}</h3>
        </div>
    )
}

export default ReleaseBox;