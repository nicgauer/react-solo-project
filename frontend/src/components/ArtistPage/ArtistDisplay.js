import ReleaseBox from '../ReleaseBox';

const ArtistDisplay = ({ artist }) => {
    return (
        <div>
            {artist.name}
            <img src={artist.pictureURL} />
            <div style={{display: 'flex'}}>
            {artist.Releases.map((release) => 
                <ReleaseBox key={release.id} release={release} artist={artist} />)}
            </div>
        </div>
    )
}

export default ArtistDisplay;