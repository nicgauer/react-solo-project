import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import * as artistActions from '../../store/artists'
import { Redirect, useHistory } from 'react-router-dom';

const NewArtistForm = () => {
    const [name, setName] = useState('');
    const [customURL, setCustomURL] = useState('');
    const [bio, setBio] = useState('');
    const [location, setLocation] = useState('');
    const [errors, setErrors] = useState('');

    const [image, setImage] = useState(null);

    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    if(!sessionUser) return (
        <Redirect to='/' />
    )

    const validation = () => {
        const errors = [];
        // const artists = dispatch(artistActions.getAllArtists)
        // const artistUrls = artists.map(artist => artist.url);

        if(name.length < 1) errors.push('Please provide a name.')
        // if(artistUrls.includes(customURL)) errors.push('URL is taken!')
        return errors;
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

    const submitHandler = (e) => {
        e.preventDefault();
        const validationErrors = validation();
        // if(validationErrors){
        //     setErrors(validationErrors);
        // }else{
            return dispatch(artistActions.newArtist({ 
                image, name, customURL, bio, location, userId: sessionUser.id
            }))
            .then(history.push('/'))
            .catch(async (res) => {
                const data = await res.json();
                if(data && data.errors) setErrors(data.errors);
            })
        // }        
    }

    return (
        <form onSubmit={submitHandler}>
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