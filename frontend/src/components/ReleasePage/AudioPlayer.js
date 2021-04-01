import { useState, useEffect } from 'react'
import styles from './AudioPlayer.module.css';

import play from '../icons/icons8-play-26.png'
import pause from '../icons/icons8-pause-26.png'

const AudioPlayer = ({ songs }) => {
    const [currentSong, setCurrentSong] = useState(songs[0])
    const [audio, setAudio] = useState(null);
    const [currentTime, setCurrentTime] = useState(0)

    const [playing, setPlaying] = useState(false);
    const [duration, setDuration] = useState('');

    useEffect(() => {
        setAudio(document.getElementById('audio'));
        if(audio){
            setDuration(audio.duration);
        }
    }, [])

    useEffect(() => {
        console.log('yep');
        const interval = setInterval(() => {setCurrentTime((prev) => prev + 1)}, 1000)
        
        if(!playing) {
            clearInterval(interval);
        }
        return () => clearInterval(interval)
    }, [playing])

    const playPauseHandler = () => {
        if(!playing){
            setDuration(audio.duration);
            setPlaying(true);
            audio.play()
        }else{
            setPlaying(false);
            audio.pause();
        }
    }

    const durationConverter = (duration) => {
        let minutes = Math.floor((Number(duration) / 60))
        let seconds = Math.floor(Number(duration) % 60)
        if(minutes === 0) minutes = '00'
        if(seconds < 10) seconds = `0${seconds}`
        return `${minutes}:${seconds}`
    }

    const changeSongHandler = (song) => {
        setCurrentSong(song);
        setDuration(audio.duration);
        setCurrentTime(0);
        if(playing){
            setPlaying(false);
            audio.pause();
        }
    }

    window.addEventListener('keydown', (e) => {
        if(e.key === ' ') playPauseHandler();
    })

    return (
        <div className={styles.container}>
            <div className={styles.playerContainer}>
                <label className={styles.label}>{currentSong.name}</label>
                <span className={styles.durationText}>{`${durationConverter(currentTime)}/${durationConverter(duration)}`}</span>
                <div className={styles.audioPlayer}>
                    <audio id='audio' className={styles.player} src={currentSong.songURL} />
                        <button className={styles.button} onClick={playPauseHandler}>
                            <img className={styles.playPauseAudio} src={playing ? pause : play} />
                        </button>


                </div>
            </div>
                <div className={styles.songlistContainer}>
                    {songs && songs.map(song => 
                        <div className={styles.songContainer}>
                            <button key={song.id} className={styles.button} onClick={() => changeSongHandler(song)}>
                                <img className={styles.selectSong} src={playing && (currentSong.id === song.id) ? pause : play} />
                            </button>
                            <span onClick={() => changeSongHandler(song)} className={playing && (currentSong.id === song.id) ? styles.currentSong : styles.selectableSong}>
                                {song.name}
                            </span>
                        </div>
                        )}
                </div> 
            
        </div>
    )
}

export default AudioPlayer;