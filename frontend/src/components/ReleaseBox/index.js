import { useHistory } from 'react-router-dom';
import styles from './ReleaseBox.module.css';

const ReleaseBox = ({ release }) => {
    return(
        <div className={styles.container}>
            <img className={styles.image} src={release.coverURL} alt={release.name} />
            <h3 className={styles.artistName}>{release.name}</h3>
        </div>
    )
}

export default ReleaseBox;