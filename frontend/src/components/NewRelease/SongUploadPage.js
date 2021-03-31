import {useState} from 'react'
import * as songActions from '../../store/song';

const SongUploadPage = ({ release }) => {
    const [name, setName] = useState('');
    const [trackNumber, setTrackNumber] = useState('');
    const [enableDownload, setEnableDownload] = useState(false);
    const [about, setAbout] = useState('');
    const [credits, setCredits] = useState('');
    const [audio, setAudio] = useState(null);

    const updateFile = (e) => {
        const file = e.target.files[0];
        if(file) setAudio(file);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        
        const song = await songActions.newSong({
            name,
            trackNumber,
            audio, 
            enableDownload,
            about,
            credits,
            releaseId: release.id
        })

        if(song){
            console.log(song);
        }
    }

    return (
        <div>
            <h2>Upload Songs for {release.name}</h2>
            
            <form onSubmit={submitHandler}>
                <label>
                    File Upload
                    <input type="file" onChange={updateFile} />
                </label>

                <label>
                    Song Name
                    <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                </label>

                <label>
                    Track Number
                    <input 
                    type="number"
                    value={trackNumber}
                    onChange={(e) => setTrackNumber(e.target.value)}
                    />
                </label>

                <label>
                    Enable Download
                    <input 
                    type="radio"
                    checked={enableDownload}
                    onClick={(e) => setEnableDownload(!enableDownload)}
                    onChange={() => {}}
                    />
                </label>

                <label>
                    About
                    <input 
                    type="textarea"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    />
                </label>

                <label>
                    Credits
                    <input
                        type='textarea'
                        value={credits}
                        onChange={(e) => setCredits(e.target.value)}
                        />
                </label>

                <button type="submit">Submit!</button>

            </form>
        </div>
    )
}

export default SongUploadPage;