
const ReleaseDisplay = ({ release }) => {
    return (<div>
        <h2>{release.name}</h2>
        <img src={release.coverURL} />
    </div>)
}

export default ReleaseDisplay;