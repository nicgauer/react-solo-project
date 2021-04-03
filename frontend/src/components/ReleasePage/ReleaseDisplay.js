import AudioPlayer from './AudioPlayer';
import styles from './ReleaseDisplay.module.css'
import {useHistory} from 'react-router-dom';
import ArtistSideBar from '../ArtistSideBar';
import Discography from '../DiscographyDisplay'
import { useSelector } from 'react-redux';
import { useState } from 'react';

import SongUploader from '../SongUploader/SongUploadPage';

const ReleaseDisplay = ({ release }) => {
    const user = useSelector((state) => state.session.user);
    const Artist = release;
    const Release = Artist.Releases[0];

    const [ viewUploader, setViewUploader ] = useState(false);

    const history = useHistory();

    const uploader = () => {
        setViewUploader(true);
    }

    const clickHandler = () => {
        history.push(`/${Artist.customURL}`)
    }

    return (
        <div>
            {viewUploader && (<SongUploader artist={Artist} release={Release} />)}
            {!viewUploader && (
                <div className={styles.wrapper} style={{ backgroundImage: `url(${Artist.backgroundURL}`}}>
                    <div className={styles.container} style={{ background: Artist.pageColor || '#FFFFFF', color: Artist.textColor || '#000000'}}>
                        
                        <div className={styles.bannerContainer}>
                            <img className={styles.banner} src={Artist.bannerURL} alt={Artist.name} />
                                <div className={styles.headerBar}>
                                    <h4 className={styles.headerLink}>Music</h4>
                                    <h4 className={styles.headerLink}>Merch</h4>
                                    <h4 className={styles.headerLink}>Social</h4>
                                </div>
                        </div>
                        
                        <div className={styles.leftMiddleColumns}>
                            <div className={styles.leftColumn}>
                                <h2 className={styles.releaseTitle}>{Release.name}</h2>
                                <h3 className={styles.subtitle}>by <span onClick={clickHandler} className={styles.artistName}>{Artist.name}</span></h3>
                                {user.id === Artist.userId && (
                                    <div className={styles.buttonContainer}>
                                        <button className={styles.ownerButton} onClick={uploader}>Add Songs</button>
                                        <button className={styles.ownerButton}>Edit Release</button>
                                    </div>
                                )}
                                <div className={styles.audioPlayer}>
                                    {Release.Songs[0] && (<AudioPlayer songs={Release.Songs} />)}
                                </div>
                                
                                {Release.about && (<pre className={styles.about}>{Release.about}</pre>)}
                                {Release.credits && (<pre className={styles.credits}>{Release.credits}</pre>)}
                                {Release.releaseDate && (<pre className={styles.releaseDate}>{Release.releaseDate}</pre>)}

                            </div>

                            <div className={styles.middleColumn}>
                            <img className={styles.albumArt} src={Release.coverURL} alt={Release.name} />

                            </div>

                        </div>

                        <div className={styles.rightColumn}>
                            <ArtistSideBar artist={Artist} />
                            <Discography artist={Artist} />
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}

export default ReleaseDisplay;