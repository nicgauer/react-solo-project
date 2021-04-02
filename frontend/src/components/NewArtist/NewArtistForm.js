import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import * as artistActions from '../../store/artists'
import { Redirect, useHistory } from 'react-router-dom';

const reservedURLs = [
    'new-artist',
    'new-release',
    'login',
    'signup',
    'new-song', 
    'api'
]

const NewArtistForm = () => {
    const [name, setName] = useState('');
    const [customURL, setCustomURL] = useState('');
    const [bio, setBio] = useState('');
    const [location, setLocation] = useState('');
    const [errors, setErrors] = useState([]);

    const [pageColor, setPageColor] = useState('#000000');
    const [textColor, setTextColor] = useState('#000000');

    const [image, setImage] = useState(null);

    const [profileImage, setProfileImage] = useState(null)
    const [bannerImage, setBannerImage] = useState(null)
    const [backgroundImage, setBackgroundImage] = useState(null)

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

    const updateProfileImage = (e) => {
        const file = e.target.files[0];
        if(file) setProfileImage(file);
    }

    const updateBannerImage = (e) => {
        const file = e.target.files[0];
        if(file) setBannerImage(file);
    }
    
    const updateBackgroundImage = (e) => {
        const file = e.target.files[0];
        if(file) setBackgroundImage(file);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log('submit handler')
        let images = [];
        if(profileImage) images[0] = profileImage;
        if(bannerImage) images[1] = bannerImage;
        if(backgroundImage) images[2] = backgroundImage;

        console.log(images)
        // await validation()
            const artist = await artistActions.newArtist({ 
                images,
                name,
                customURL,
                pageColor,
                textColor,
                bio,
                location,
                userId: sessionUser.id
            })

            if(artist) console.log('success!');
            
        // } catch (e) {
        //     // setErrors(e);
        //     }     
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
                    onChange={updateProfileImage}
                />
            </label>

            <label>
                Profile Banner Image
                <input 
                    type="file"
                    onChange={updateBannerImage}
                />
            </label>

            <label>
                Profile Background Image
                <input 
                    type="file"
                    onChange={updateBackgroundImage}
                />
            </label>

            <label>
                Profile Page Color
                <input 
                    type="color"
                    value={pageColor}
                    onChange={(e) => setPageColor(e.target.value)}
                />
            </label>

            <label>
                Profile Page Text Color
                <input 
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
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