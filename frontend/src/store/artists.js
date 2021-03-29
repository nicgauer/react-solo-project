import { csrfFetch } from './csrf';

// const NEW_ARTIST = 'new-artist';

// //Action creators
// const newArtist = (artist) => {
//     return { 
//         type: NEW_ARTIST,
//         payload: artist,
//     }
// }

//Create artist thunk
export const newArtist = (artist) => async dispatch => {
    console.log('New Artist Thunk Activated!')
    const { image, name, customURL, bio, location, userId } = artist;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('userId', userId);
    formData.append('customURL', customURL);

    if(bio) formData.append('bio', bio);
    if(location) formData.append('location', location);
    if(image) formData.append('image', image);

    const response = await csrfFetch('/api/new-artist', {
        method: 'POST',
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData,
    })

    const data = await response.json();
    // dispatch(newArtist(data.artist))
    return response;
}

export const getArtist = (url) => async dispatch => {
    const artist = await csrfFetch(`/api/${url}`);
    const response = await artist.json();
    return response
}

export const getAllArtists = () => async dispatch => {
    const artists = await csrfFetch(`/api/artists`);
    return artists
}