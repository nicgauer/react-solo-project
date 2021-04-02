import { useState, useEffect } from 'react'
import styles from './AudioPlayer.module.css';

import play from '../icons/icons8-play-26.png'
import pause from '../icons/icons8-pause-26.png'
import prev from '../icons/icons8-rewind-24.png'
import next from '../icons/icons8-fast-forward-24.png'

const AudioPlayer = ({ songs }) => {
    const [currentSong, setCurrentSong] = useState(0)
    const [audio, setAudio] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);

    const [playing, setPlaying] = useState(false);
    const [duration, setDuration] = useState('--:--');

    useEffect(() => {
        const audioPlayer = document.getElementById('audio');
        setAudio(audioPlayer);
    }, [])

    useEffect(() => {
        if(playing){
            setDuration(audio.duration);
            setCurrentTime(audio.currentTime);
            var interval = setInterval(() => {
                console.log('ping');
                const audioPlayer = document.getElementById('audio')
                setCurrentTime(
                    audioPlayer.currentTime)
                setDuration(
                    audioPlayer.duration
                )
            }, 1000);
        }
        return () => clearInterval(interval)
    }, [playing])

    const playNextSong = () => {
        if(songs.length > currentSong + 1){
            setCurrentSong(currentSong + 1)
            const audioPlayer = document.getElementById('audio');
            audioPlayer.autoplay = true;
            audioPlayer.load();
        }else {
            const audioPlayer = document.getElementById('audio');
            setCurrentSong(0);
            audioPlayer.autoplay = false;
            setPlaying(false);
        }
    }

    const nextButtonHandler = () => {
        if(songs.length > currentSong + 1){
            setCurrentSong(currentSong + 1);
        }  
    }

    const prevButtonHandler = () => {
        if(currentSong > 0){
            setCurrentSong(currentSong - 1);
        }   
    }


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
        if(duration === '--:--') return duration;
        let minutes = Math.floor(Number(duration) / 60)
        let seconds = Math.floor(Number(duration) % 60)
        if(minutes === 0) minutes = '00'
        if(seconds < 10) seconds = `0${seconds}`
        return `${minutes}:${seconds}`
    }

    const changeSongHandler = (song) => {
        setCurrentSong(song);
        setDuration(audio.duration);
        if(playing){
            setPlaying(false);
            audio.pause();
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.playerContainer}>
                <label className={styles.label}>{songs[currentSong].name}</label>
                <span className={styles.durationText}>
                    {audio && `${durationConverter(currentTime)}/${durationConverter(duration)}`}
                    </span>
                <button className={styles.nextButton} onClick={nextButtonHandler}>
                    <img className={styles.nextIcon} src={next} alt='next' />
                </button>
                <button className={styles.prevButton} onClick={prevButtonHandler}>
                    <img className={styles.prevIcon} src={prev} alt='prev' />
                </button>
                
                <div className={styles.audioPlayer}>
                    <audio id='audio' onEnded={playNextSong} className={styles.player} src={songs[currentSong].songURL} />
                        <button className={styles.button} onClick={playPauseHandler}>
                            <img className={styles.playPauseAudio} src={playing ? pause : play} />
                        </button>
                    

                </div>
            </div>
                <div className={styles.songlistContainer}>
                    {songs && songs.map((song, i) => 
                        <div className={styles.songContainer}>
                            <button key={song.id} className={styles.button} onClick={() => changeSongHandler(i)}>
                                <img className={styles.selectSong} src={playing && (songs[currentSong].id === song.id) ? pause : play} />
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