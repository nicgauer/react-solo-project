import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import * as artistActions from '../../store/artists';

import ReleaseBox from '../ReleaseBox';

import styles from './Discography.module.css';


const Discography = ({ artist }) => {
    const [seeMore, setSeeMore] = useState(false);
    const [Releases, setReleases] = useState(artist.Releases)
    
    const history = useHistory();

    useEffect(() => {
        (async () => {
            const fullArtist = await artistActions.getArtist(artist.customURL);
            console.log(fullArtist);
            if(fullArtist) setReleases(fullArtist.artist.Releases);
        }
        )();
    }, [])

    const seeAll = () => {
        history.push(`/${artist.customURL}`)
    }

    const seeMoreToggle = () => {
        setSeeMore(!seeMore);
    }

    if(!Releases[0]){
        return (
            <h6>This artist hasn't released anything yet!</h6>
        )
    }

    if(!seeMore){     
            return (
                <div>
                <h2>Discography</h2>
                <ReleaseBox release={Releases[0]} artist={artist} style={'discography'} />
                <h5 className={styles.clickText} onClick={seeMoreToggle}>See more...</h5>
            </div>
        )
    }else {
        return (
            <div>
            <h2>Discography</h2>
            <ReleaseBox release={Releases[0]} artist={artist} style={'discography'} />
            {Releases.length > 1 && (<ReleaseBox release={Releases[1]} artist={artist} style={'discography'} />)}
            {Releases.length > 2 && (<ReleaseBox release={Releases[2]} artist={artist} style={'discography'} />)}  
            {Releases.length > 3 && (<h5 className={styles.clickText} onClick={seeAll}>See All...</h5>)}
            <h5 className={styles.clickText} onClick={seeMoreToggle}>See less...</h5>
        </div>
        )
    }


}

export default Discography;