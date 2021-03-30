const ArtistDisplay = ({ artist }) => {
    return (
        <div>
            {artist.name}
            <img src={artist.pictureURL} />
            {artist.Releases.map((release) => 
                <li key={release.id}>
                    <h4>{release.name}</h4>
                    <img src={release.coverURL} />
                </li>)}
        </div>
    )
}

export default ArtistDisplay;