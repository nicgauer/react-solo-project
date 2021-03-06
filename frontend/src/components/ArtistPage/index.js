import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import {useDispatch} from 'react-redux';
import PageNotFound from '../PageNotFound';
import ArtistDisplay from './ArtistDisplay'
import * as artistActions from '../../store/artists';
import Loading from '../Loading';

const ArtistPage = () => {

    const { url } = useParams();
    const [ loaded, setLoaded ] = useState(false);
    const [ artist, setArtist ] = useState(null);

    useEffect(() => {
        (async () => {
            const response = await artistActions.getArtist(url)
            if(response) setArtist(response.artist)
            setLoaded(true);
        })();
    }, [])

    return (
        <div>
            {!loaded && (<Loading />)}
            {loaded && artist && (<ArtistDisplay artist={artist} />)}
            {loaded && !artist && (<PageNotFound />)}
        </div>
    )
}

export default ArtistPage;