import {useState} from 'react'
import {useHistory} from 'react-router-dom';
import * as songActions from '../../store/song';
import Loading from '../Loading';

const SongUploadPage = ({ release, artist }) => {
    const [name, setName] = useState('');
    const [trackNumber, setTrackNumber] = useState('');
    const [enableDownload, setEnableDownload] = useState(false);
    const [about, setAbout] = useState('');
    const [credits, setCredits] = useState('');
    const [audio, setAudio] = useState(null);
    const [complete, setComplete] = useState(false)
    const [uploading, setUploading] = useState(false);

    const history = useHistory();

    const updateFile = (e) => {
        const file = e.target.files[0];
        if(file) setAudio(file);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log('submit fired');
        setUploading(true);
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
            setName('');
            setTrackNumber(trackNumber + 1);
            setAbout('');
            setCredits('');
            setAudio(null);
            if(complete){
                history.push(`/${artist.customURL}/${release.releaseURL}`)
            }else{
                setUploading(false);
            }
        }
    }

    // const addMore = () => {
    //     setName('');
    //     setTrackNumber(trackNumber + 1);
    //     setAbout('');
    //     setCredits('');
    //     setAudio('');
    // }

    return (
        <div>
            {uploading && (<Loading uploading={true} />)}
            {!uploading && (
                <form onSubmit={submitHandler}>
                    <h2>Upload Songs for {release.name}</h2>
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

                    <button type="submit">Add more songs</button>
                    <button type="submit" onClick={() => setComplete(true)}>Complete</button>

                </form>
            )}
        </div>
    )
    
}

export default SongUploadPage;