import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as artistActions from '../../store/artists';
import * as releaseActions from '../../store/releases';
import { useHistory } from 'react-router-dom';
import SongUploadPage from '../SongUploader/SongUploadPage';
import PageNotFound from '../PageNotFound';

import styles from './NewReleaseForm.module.css';

const NewReleaseForm = () => {
    const [name, setName] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [artistId, setArtistId] = useState('');
    const [about, setAbout] = useState('');
    const [credits, setCredits] = useState('');
    const [ownedArtists, setOwnedArtists] = useState([]);
    const [errors, setErrors] = useState([]);

    const [image, setImage] = useState(null);

    const [release, setRelease] = useState(null);
    const [uploadPage, setUploadPage] = useState(false);



    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        (async () => {
                const artists = await artistActions.getOwnedArtists(sessionUser.id)
                if(artists) {
                    setOwnedArtists(artists.artists);
                    setArtistId(artists.artists[0].id)
                }
        })();
    }, [sessionUser.id])

    useEffect(() => {
        if(release){
            setUploadPage(true)
        }
    }, [release]);


    const updateFile = (e) => {
        const file = e.target.files[0];
        if(file) setImage(file);
    }

    const cancelHandler = () => {
        history.push('/')
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        
        const newRelease = await releaseActions.newRelease({
            image, artistId, name, releaseDate, about, credits
        })
        .catch(async (res) => {
            const data = await res.json();
            if(data && data.errors) setErrors(data.errors);
        })

        if(newRelease) {
            const json = await newRelease.json();
            setRelease(json);
        }
    }

    if(uploadPage === false){   
        return (
            <div className={styles.container}>

                <form className={styles.form} onSubmit={submitHandler}>
                <h2>Create New Release</h2>
                {errors && errors.map(error => <p key={error}>{error.message}</p>)}
                <label className={styles.label}>
                    Select artist
                    <select
                        value={artistId}
                        onChange={(e) => setArtistId(e.target.value)}
                        >
                        {ownedArtists.map((artist) => <option key={artist.id} value={artist.id}>{artist.name}</option>)}
                    </select>
                </label>

                <label className={styles.label}>
                    Release Name
                    <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
                </label>

                <label className={styles.label}>
                    Cover Photo
                    <input type='file' onChange={updateFile} />
                </label>

                <label className={styles.label}>
                    Release Date
                    <input type='date' value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} />
                </label>
                
                <label className={styles.label}>
                    About
                    <input type='textarea' value={about} onChange={(e) => setAbout(e.target.value)} />
                </label>

                <label className={styles.label}>
                    Credits
                    <input type='textarea' value={credits} onChange={(e) => setCredits(e.target.value)} />
                </label>

                <div className={styles.buttonContainer}>
                    <button className={styles.submitButton} type='submit'>Upload Songs</button>
                    <button className={styles.cancelButton} onClick={cancelHandler}>Cancel</button>
                </div>
            </form>
        </div>
    )
    }else {
        return (
            <>
                {release && <SongUploadPage release={release.release} artist={ownedArtists[artistId]} />}
                {!release && <PageNotFound />}
            </>
        )
    }
}

export default NewReleaseForm;