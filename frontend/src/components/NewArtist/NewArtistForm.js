import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { csrfFetch } from '../../store/csrf';


const NewArtistForm = () => {
    const [name, setName] = useState('');
    const [customURL, setCustomURL] = useState('');
    const [bio, setBio] = useState('');
    const [location, setLocation] = useState('');

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    

    const submitHandler = (e) => {
        e.preventDefault();

        setErrors([]);
    }

    return (
        <form>

        </form>
    )
}

export default NewArtistForm;