import React from "react";
import { playSong } from "../util";

const LibrarySong = ({ song, songs, id, setCurrentSong, audioRef, isPlaying, setSongs }) => {

    const songSelectHandler = async () => {

        await setCurrentSong(song)

        //Add Active State
        const newSongs = songs.map((song) => {
        if(song.id === id){
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

        //Check if song is playing
        playSong(isPlaying, audioRef)

    } 

    return(
        <div onClick={songSelectHandler} className={`library-song ${song.active ? 'selected' : ''}`}>
            <img alt={song.name} src={song.cover} />
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    )
}

export default LibrarySong;