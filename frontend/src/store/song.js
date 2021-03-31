import { csrfFetch } from './csrf';

export const newSong = async (song) => {
    const { audio, releaseId, name, trackNumber, enableDownload, about, credits } = song;
    const formData = new FormData();
    formData.append('releaseId', releaseId);
    formData.append('name', name);
    formData.append('trackNumber', trackNumber);
    formData.append('enableDownload', enableDownload);
    formData.append('about', about);
    formData.append('credits', credits);
    formData.append('audio', audio);

    const response = await csrfFetch('/api/new-song', {
        method: 'POST',
        headers: {
            "Content-Type": "multipart/form-data"
        },
        body: formData,
    })
    const result = response.json()
    return result;
}