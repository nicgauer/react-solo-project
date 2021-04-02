import ReleaseBox from '../ReleaseBox';
import ArtistSideBar from '../ArtistSideBar';

import styles from './ArtistDisplay.module.css';

const ArtistDisplay = ({ artist }) => {

    return (
        <div className={styles.wrapper} style={{ backgroundImage: `url(${artist.backgroundURL}`}}>
            

            <div className={styles.container} style={{ background: artist.pageColor || '#FFFFFF', color: artist.textColor || '#000000'}}>
            
            <div className={styles.bannerContainer}>
                <img className={styles.banner} src={artist.bannerURL} alt={artist.name} />
                <div className={styles.headerBar}>
                    <h4 className={styles.headerLink}>Music</h4>
                    <h4 className={styles.headerLink}>Merch</h4>
                    <h4 className={styles.headerLink}>Social</h4>
                </div>
            </div>

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