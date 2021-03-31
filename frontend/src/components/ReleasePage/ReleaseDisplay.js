

const ReleaseDisplay = ({ release }) => {
    const Artist = release;
    const Release = Artist.Releases[0];

    return (<div>
        <h2>{Release.name} {Artist.name}</h2>
        <img src={Release.coverURL} />
    </div>)
}

export default ReleaseDisplay;