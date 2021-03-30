import { csrfFetch } from './csrf';

export const newRelease = async (release) => {
    const { image, artistId, name, releaseDate, bio, credits } = release;
    const formData = new FormData();
    formData.append('artistId', artistId)
    formData.append('name', name)
    formData.append('releaseDate', releaseDate)
    if(bio) formData.append('bio', bio)
    if(credits) formData.append('credits', credits)
    formData.append('image', image)

    try{
        const response = await csrfFetch('/new-release', {
            method: 'POST',
            headers: {
                "Content-Type": "multipart/form-data"
            },
            body: formData,
        })
        return response;
    } catch (e) {
        console.error(e);
    }
}