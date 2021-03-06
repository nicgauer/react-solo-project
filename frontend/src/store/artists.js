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
export const newArtist = async (artist) => {
    const { images, name, customURL, pageColor, textColor, bio, location, userId } = artist;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('userId', userId);
    formData.append('customURL', customURL);
    formData.append('pageColor', pageColor);
    formData.append('textColor', textColor);

    if(bio) formData.append('bio', bio);
    if(location) formData.append('location', location);

    if(images && images.length !== 0) {
        for(let i = 0; i < images.length; i++) {
            formData.append("images", images[i]);
        }
    };

    const response = await csrfFetch('/api/new-artist', {
        method: 'POST',
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData,
    })

    const data = await response.json();

    return data;
}

export const getArtist = async (url) => {
    try{
        const artist = await csrfFetch(`/api/${url}`);
        const response = await artist.json();
        return response
    } catch (e) {
        return null;
    }
}

export const getAllArtists = async () => {
    const artists = await csrfFetch(`/api/artists`);
    const response = await artists.json();
    return response.artists;
}

export const getOwnedArtists = async (userId) => {
    try {
        const artists = await csrfFetch(`/api/artists/${userId}`);
        const response = await artists.json();
        return response;
    } catch (e) {
        return null;
    }
}