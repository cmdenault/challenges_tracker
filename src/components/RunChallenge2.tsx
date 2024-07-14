// record a challenge

// need to pass in a challenge object?
// or make it so id is passed and we get it here?

// imports
import React, { useState, useEffect } from 'react';
// import moment from 'moment';
//import format from 'moment-duration-format';



// form the challenge should be in
interface RunChallengeProps {
    challenge: { 
        title: string;
        id: string;
        locations: string[]
    }
}

const RunChallenge: React.FC<RunChallengeProps> = ( ) => {
        // hooks
        const [totalTime, setTotalTime] = useState(0)
        const [timerOn, setTimerOn] = useState(false)
        const [startTime, setStartTime] = useState(0);


        // neccessary function
        useEffect(() => {
            var interval:number | undefined 
            interval = undefined
 
            if (timerOn) {
                interval = setInterval(() => {
                    const currentTime = new Date().getTime()
                    const elaspsedTime = currentTime - startTime
                    setTotalTime(elaspsedTime)
                }, 100) 
            } else {
                clearInterval(interval)
            }

            return () => clearInterval(interval)

        }, [timerOn])


        const handleStart = () => {
            setTimerOn(true);
            setStartTime(new Date().getTime()) 
        };
    
        const handleStop = () => {
            setTimerOn(false);
        };

        const handleReset = () => {
            setTotalTime(0);
          };

        const formatTime = (totalTime:number) => {
            const f = (totalTime / 1000 % 60).toFixed(0) // toFixed gets whole number 
            const getSeconds = `${f}`.padStart(2, '0');
            const minutes = `${Math.floor((totalTime / 60000) % 60)}`.padStart(2, '0');

            return `${minutes} : ${getSeconds}`;
        };
    
        return(
            <div>
                <div className="stopwatch-display">
                    {formatTime(totalTime)}
                </div>
                <div className="stopwatch-buttons">
                    <button onClick={handleStart}>Start</button>
                    <button onClick={handleStop}>Stop</button>
                    <button onClick={handleReset}>Reset</button>
                </div>
            </div>
        )
}

export default RunChallenge