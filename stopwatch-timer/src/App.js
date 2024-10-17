import React, { useState, useEffect } from 'react'; // Importing necessary hooks from React
import './App.css'; // Get the css file for styling

function App() {

  //keeps track of time, intital = 0
  const [time, set_time] = useState(0);

  //running or not state variable, initial = false (not running)
  const [Running, set_running] = useState(false);


  useEffect(function() {

    // stores id of a repeating process
    let intervalId;

    // start interval if timer is running
    if (Running) {

      // Runs set_time function repeatedly with a given delay (10 ms here)
      // First argumer in the function and the second arument is the delay
      // returns a specific id that identifies the interval running in the background. id can be used to stop the
      // interval
      intervalId = setInterval(function() {
        // adds 10ms each time it runs
        set_time(function(prevTime) {return prevTime + 10;});
      }, 10);
    } 

    // this stops time increments when paused/stopped
    // clears interval by id
    else if (!Running && time !== 0) {
      clearInterval(intervalId);
    }

    // makes sure that interval is stopped after stop/reset
    return function() {
      clearInterval(intervalId);
    };
  }, [Running, time]); // dependency array for useEffect. Takes two state variables that guide operation

  // change running state to true
  function startTimer() {
    set_running(true); 
  }

  // change running state to false
  function stopTimer() {
    set_running(false);
  }

  // running state = false, time state = 0
  // Back to initial
  function resetTimer() {
    set_running(false); // Stop the timer
    set_time(0); // Reset the time to zero
  }

  // fed time in ms. initially 0 ms
  function formatTime(time) {
    // modulo makes it stay in range 0-99 ms, adds to "0" then takes only last two of string with slice
    let milli_seconds = ("0" + (Math.floor(time / 10) % 100)).slice(-2);

    let seconds = ("0" + (Math.floor(time / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(time / 60000) % 60)).slice(-2); 

    return minutes + ":" + seconds + ":" + milli_seconds; // concatenates time and returns
  }

  // app displays stopwatch through js xml
  return (
    <div className="Main">
      <h1>Stopwatch</h1>
      <div className="display">{formatTime(time)}</div>

      {/* If not running, click starts time */}
      {!Running && <button className = 'start' onClick={startTimer}>Start</button>}
      {/* If running, click stops clock */}
      {Running && <button  className = 'stop' onClick={stopTimer}>Stop</button>}
      {/* Reset clock */}
      <button className = 'reset' onClick={resetTimer}>Reset</button>
    </div>
  );
}

export default App;
