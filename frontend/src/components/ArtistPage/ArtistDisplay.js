const ArtistDisplay = ({ artist }) => {
    return (
        <div>
            {artist.name}
            <img src={artist.pictureURL} />
        </div>
    )
}

export default ArtistDisplay;