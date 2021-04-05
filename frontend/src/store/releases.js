import { csrfFetch } from './csrf';

export const newRelease = async (release) => {
    const { image, artistId, name, releaseDate, about, credits } = release;
    const formData = new FormData();
    formData.append('artistId', artistId)
    formData.append('name', name)
    formData.append('releaseDate', releaseDate)
    if(about) formData.append('bio', about)
    if(credits) formData.append('credits', credits)
    if(image) formData.append('image', image)

    //converts name to workable URL
    const newurl = name.replace(/\s+/g, '-').toLowerCase();
    formData.append('releaseURL', newurl)

        const response = await csrfFetch('/api/releases/new-release', {
            method: 'POST',
            headers: {
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
        return response;
}

export const getRelease = async (artistUrl, releaseName) => {
    const release = await csrfFetch(`/api/releases/${artistUrl}/${releaseName}`)
    const response = await release.json();
    return response;
}

export const getFullUrl = async (release) => {
    const response = await csrfFetch(`/api/${release.id}`)
    const result = await response.json();
    return result;
}