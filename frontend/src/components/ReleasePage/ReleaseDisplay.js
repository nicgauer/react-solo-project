import AudioPlayer from './AudioPlayer';

const ReleaseDisplay = ({ release }) => {
    const Artist = release;
    const Release = Artist.Releases[0];

    return (<div>
        <h2>{Release.name} {Artist.name}</h2>
        <img src={Release.coverURL} />
        {Release && Release.Songs.map(song => <AudioPlayer key={song.id} song={song} />)}
    </div>)
}

export default ReleaseDisplay;