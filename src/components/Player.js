import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faAngleLeft, faAngleRight, faPause } from "@fortawesome/free-solid-svg-icons";
import { playSong } from "../util";

const Player = ({ audioRef, songTime, setSongTime, currentSong, isPlaying, setIsPlaying, songs, setCurrentSong, setSongs }) => {

    //Event Handlers 
    const playSongHandler = () => {
        if(isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying)
        }else{
            audioRef.current.play();
            setIsPlaying(!isPlaying)
        }
    }

    const formatTime = (time) => {
        return(
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        )
    }

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value
        setSongTime({
            ...songTime,
            currentTime: e.target.value
            });
    }

     const activeLibraryHandler = (nextPrev) => {
        const newSongs = songs.map((song) => {
            if(song.id === nextPrev.id){
                return{
                    ...song,
                    active: true
                }
            }else {
                return{
                    ...song,
                    active: false
                }
            }
        })
        setSongs(newSongs)
     }

    const skipTrackHandler = (direction) =>{
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id)
        
        if(direction === 'skip-forward'){
            setCurrentSong(songs[(currentIndex + 1) % songs.length])
            activeLibraryHandler(songs[(currentIndex + 1) % songs.length])
        }
        if(direction === 'skip-back'){
            if((currentIndex - 1) % songs.length === - 1){
                setCurrentSong(songs[songs.length - 1]);
                activeLibraryHandler(songs[songs.length - 1])
                playSong(isPlaying, audioRef)
                return
            }
            setCurrentSong(songs[(currentIndex - 1) % songs.length])
            activeLibraryHandler(songs[(currentIndex - 1) % songs.length])
        }
        playSong(isPlaying, audioRef)
    }

    return(
        <div className="player">
            <div className="time-control">
                <p>{formatTime(songTime.currentTime)}</p>
                <input
                min={0} 
                max={songTime.duration || 0} 
                value={songTime.currentTime} 
                onChange={dragHandler}
                type="range" 
                />
                <p>{songTime.duration ? formatTime(songTime.duration) : "0:00"}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon 
                onClick={() => skipTrackHandler('skip-back')}
                className="skip-back" 
                size="2x" 
                icon={faAngleLeft}
                />
                <FontAwesomeIcon 
                onClick={playSongHandler} 
                className="play" size="2x" 
                icon={ isPlaying ? faPause : faPlay }
                />
                <FontAwesomeIcon 
                onClick={() => skipTrackHandler('skip-forward')}
                className="skip-forward" 
                size="2x" 
                icon={faAngleRight}
                />
            </div>

        </div>
    )
}

export default Player; 