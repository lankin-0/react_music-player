import React, { useState, useRef } from 'react';
//Import Styles
import "./styles/app.scss";
//Import Components
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import Nav from './components/Nav';
//Import Util
import data from './data';

function App() {

    //Ref
    const audioRef = useRef(null);

    //State
    const [songs, setSongs] = useState(data);
    const [currentSong, setCurrentSong] = useState(songs[3]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [songTime, setSongTime] = useState({
        currentTime: 0,
        duration: 0
    });
    const [libraryStatus, setLibraryStatus] = useState(false);

    //Handlers
    const timeUpdateHandler = (e) => {
        const current = e.target.currentTime
        const duration = e.target.duration
        setSongTime({
            ...songTime,
            currentTime: current,
            duration: duration
        })
    }

    return (
        <div className={`App ${libraryStatus ? 'library-active' : ''}`}> 
            <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
            <Song currentSong={currentSong}/>
            <Player
            setSongs={setSongs}
            setCurrentSong={setCurrentSong}
            songs={songs}
            songTime={songTime}
            setSongTime={setSongTime}
            audioRef={audioRef}
            setIsPlaying={setIsPlaying}
            isPlaying={isPlaying}
            currentSong={currentSong}
            />
            <Library 
            libraryStatus={libraryStatus}
            audioRef={audioRef}
            songs={songs} 
            setCurrentSong={setCurrentSong}
            isPlaying={isPlaying}
            setSongs={setSongs}
            />
            <audio
            onLoadedMetadata={timeUpdateHandler} 
            onTimeUpdate={timeUpdateHandler}
            ref={audioRef} 
            src={currentSong.audio}
            ></audio>
        </div>
    )
}

export default App;
