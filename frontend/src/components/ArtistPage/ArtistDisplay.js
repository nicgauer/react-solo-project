import ReleaseBox from '../ReleaseBox';
import ArtistSideBar from '../ArtistSideBar';

import styles from './ArtistDisplay.module.css';

const ArtistDisplay = ({ artist }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.leftMiddleColumns}>
                    <div className={styles.releaseContainer}>
                    {!artist.Releases[0] && (<h2>This artist hasn't released anything yet!</h2>)}
                    {artist.Releases.map((release) => 
                        <ReleaseBox key={release.id} release={release} artist={artist} />)}
                    </div>

                </div>
                <div className={styles.rightColumn}>
                    <ArtistSideBar artist={artist} />
                </div>
            </div>
        </div>
    )
}

export default ArtistDisplay;