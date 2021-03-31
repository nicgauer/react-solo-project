// import { useState } from 'react'

const AudioPlayer = ({ song }) => {

    return (
        <div>
            <audio controls src={song.songURL} />
        </div>
    )
}

export default AudioPlayer;