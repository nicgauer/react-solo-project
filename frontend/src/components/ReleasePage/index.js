import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageNotFound from '../PageNotFound';
import ReleaseDisplay from './ReleaseDisplay';
import Loading from '../Loading';

import * as releaseActions from '../../store/releases';

const ReleasePage = () => {
    const { url, release } = useParams();
    const [ loaded, setLoaded ] = useState(false);
    const [ targetRelease, setRelease ] = useState(null);

    useEffect(() => {
        (async () => {
                const response = await releaseActions.getRelease(url, release);
                console.log(response);
                if(response) setRelease(response.artist);
                setLoaded(true);
        })();
    }, [])

    return (
        <div>
            {!loaded && (<Loading />)}
            {loaded && targetRelease && (<ReleaseDisplay release={targetRelease} />)}
            {loaded && !targetRelease && (<PageNotFound />)}
            {console.log(url, release)}
        </div>
    )
}

export default ReleasePage;