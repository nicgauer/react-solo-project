import AudioPlayer from './AudioPlayer';
import styles from './ReleaseDisplay.module.css'
import {useHistory} from 'react-router-dom';

const ReleaseDisplay = ({ release }) => {
    const Artist = release;
    const Release = Artist.Releases[0];

    const history = useHistory();

    const clickHandler = () => {
        history.push(`/${Artist.customURL}`)
    }

    return (<div className={styles.wrapper}>
        <div className={styles.container}>
            <div className={styles.leftMiddleColumns}>
                <div className={styles.leftColumn}>
                    <h2 className={styles.releaseTitle}>{Release.name}</h2>
                    <h3 className={styles.subtitle}>by <span onClick={clickHandler} className={styles.artistName}>{Artist.name}</span></h3>
                    <div className={styles.audioPlayer}>
                        {Release.Songs[0] && (<AudioPlayer songs={Release.Songs} />)}
                    </div>
                    
                    {Release.about && (<pre>{Release.about}</pre>)}
                    {Release.credits && (<pre>{Release.credits}</pre>)}

                </div>

                <div className={styles.middleColumn}>
                <img className={styles.albumArt} src={Release.coverURL} alt={Release.name} />

                </div>

            </div>

            <div className={styles.rightColumn} onClick={clickHandler}>
                <div className={styles.bioContainer}>
                    <img className={styles.artistImage} src={Artist.pictureURL} alt={Artist.name} />     
                    <h3>{Artist.name}</h3>
                    <pre className={styles.artistBio}>{Artist.bio}</pre>
                </div>
            </div>

        </div>
    </div>)
}

export default ReleaseDisplay;