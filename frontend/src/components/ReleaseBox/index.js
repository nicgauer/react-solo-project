import { useHistory } from 'react-router-dom';
import stylesNormal from './ReleaseBox.module.css';
import stylesDiscog from './DiscogRelease.module.css';

const ReleaseBox = ({ release, artist, style }) => {
    const history = useHistory();

    const clickHandler = () => {
        console.log('boom!');
        history.push(`/${artist.customURL}/${release.releaseURL}`);
        window.location.reload();
    }

    let styles = stylesNormal;
    if(style === 'discography'){
        styles = stylesDiscog
    }

    return(
        <div className={styles.container} onClick={clickHandler}>
            <img className={styles.image} src={release.coverURL} alt={release.name} />
            <h3 className={styles.artistName}>{release.name}</h3>
        </div>
        
    )
}

export default ReleaseBox;