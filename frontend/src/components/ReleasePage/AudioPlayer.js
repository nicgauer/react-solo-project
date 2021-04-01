import { useState } from 'react'
import styles from './AudioPlayer.module.css';

const AudioPlayer = ({ songs }) => {
    const [currentSong, setCurrentSong] = useState(songs[0])

    return (
        <div className={styles.container}>
            <div className={styles.playerContainer}>
                <label className={styles.label}>{currentSong.name}</label>
                <audio className={styles.player} controls src={currentSong.songURL} />
                <div>
                    {songs && songs.map(song => 
                        <button key={song.id} onClick={() => setCurrentSong(song)}>{song.name}</button>
                        )}
                </div> 
            </div>
            
        </div>
    )
}

export default AudioPlayer;