import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import * as artistActions from '../../store/artists'
import { Redirect, useHistory } from 'react-router-dom';

const reservedURLs = [
    'new-artist',
    'new-release',
    'login',
    'signup',
]

const NewArtistForm = () => {
    const [name, setName] = useState('');
    const [customURL, setCustomURL] = useState('');
    const [bio, setBio] = useState('');
    const [location, setLocation] = useState('');
    const [errors, setErrors] = useState([]);

    const [image, setImage] = useState(null);

    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    if(!sessionUser) return (
        <Redirect to='/' />
    )

    const validation = async () => {
        const validationErrors = [];
        const artists = await artistActions.getAllArtists()
        let artistUrls = artists.map(artist => artist.customURL);
        artistUrls = [...artistUrls, ...reservedURLs]

        if(name.length < 1) validationErrors.push('Please provide a name.')
        if(artistUrls.includes(customURL)) validationErrors.push('URL is taken!')

        setErrors(validationErrors);
    }

    const nameHandler = (e) => {
        setName(e.target.value);
    }

    const urlHandler = (e) => {
        setCustomURL(e.target.value);
    }

    const bioHandler = (e) => {
        setBio(e.target.value);
    }

    const locationHandler = (e) => {
        setLocation(e.target.value);
    }

    const updateFile = (e) => {
        const file = e.target.files[0];
        if(file) setImage(file);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        await validation();
            return dispatch(artistActions.newArtist({ 
                image, name, customURL, bio, location, userId: sessionUser.id
            }))
            .then(history.push('/'))
            .catch(async (res) => {
                const data = await res.json();
                if(data && data.errors) setErrors(data.errors);
            })       
    }

    return (
        <form onSubmit={submitHandler}>
            {errors.map(error => <p key={error}>{error.message}</p>)}
            <label>
                Artist Name
                <input
                    type="text"
                    value={name}
                    onChange={nameHandler}
                />
            </label>

            <label>
                Profile Image
                <input 
                    type="file"
                    onChange={updateFile}
                />
            </label>

            <label>
                Custom URL
                <input
                    type="text"
                    value={customURL}
                    onChange={urlHandler}
                />
            </label>

            <label>
                Biography
                <input
                    type="textarea"
                    value={bio}
                    onChange={bioHandler}
                />
            </label>

            <label>
                Location
                <input 
                    type="text"
                    value={location}
                    onChange={locationHandler}
                    />
            </label>

            <div>
                <button type="submit">
                    Submit
                </button>
            </div>
        </form>
    )
}

export default NewArtistForm;