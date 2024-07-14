// record a challenge

// imports
import React, { useState, useEffect } from 'react';
//import format from 'moment-duration-format';

// interfaces

interface ChallengeSegment { // set format for a segment of the run
    name: string;
    time: number | null;
}

// form the incoming challenge data should be in
interface RunChallengeProps {
    challenge: { 
        title: string;
        id: string;
        locations: string[]
    }
}

const RunChallenge: React.FC<RunChallengeProps> = ( {challenge} ) => {
        // hooks
        const [isRunning, setIsRunning] = useState(false);
        const [startTime, setStartTime] = useState(0); // the start time of when start button was clicked
        const [segments, setSegments] = useState<ChallengeSegment[]>([])
        const [totalTime, setTotalTime] = useState(0)

        // necessary functions
        useEffect(() => {
            const theSegments = challenge.locations //challenge object location array is called locations
            const initalSegments: ChallengeSegment[] = theSegments.map(
                (name) => ({name, time: null})
            )
            setSegments(initalSegments)
        }, [challenge.locations]);

        useEffect(() => {
            var interval:number | undefined 
            interval = undefined
 
            if (isRunning) {
                interval = setInterval(() => {
                    const currentTime = new Date().getTime()
                    const elaspsedTime = currentTime - startTime
                    setTotalTime(elaspsedTime)
                }, 100)  // smaller reduces offset of queueing, but nbd right now
            } else {
                clearInterval(interval)
            }

            return () => clearInterval(interval)

        }, [isRunning])



        const handleClickStart = () => {
            setIsRunning(true)
            setStartTime(new Date().getTime()) // timestamp

        }

        const handleClickNextSegment = () => {
            if (!isRunning) return

            const currentSegmentIndex = segments.findIndex(
                (segment) => !segment.time // first null segment
            )

            if (currentSegmentIndex === -1) {
                // all segments complete, stop
                setIsRunning(false)
                return
            }

            // valid segment, fill it
            const currentTime = new Date().getTime()
            const elaspsedTime = currentTime - startTime

            // have name and time array
            // only shallow copy time here, 
            const updatedSegments = [...segments] 
            updatedSegments[currentSegmentIndex].time = elaspsedTime
            setSegments(updatedSegments)

            // setTotalTime(totalTime + elaspsedTime)
            // setStartTime(currentTime) 
        }


        const handleClickEndChallenge = () => {
            setIsRunning(false)
        }

        // const getFormattedTime = (time: number | null) => {
        //     return time ? moment.duration(time, "seconds").format('mm:ss') 
        //     : '--:--'
        // }
        const getFormattedTime = (totalTime:number | null) => {
            if (!totalTime) return '00 : 00'

            const f = (totalTime / 1000 % 60).toFixed(0) // toFixed gets whole number 
            const getSeconds = `${f}`.padStart(2, '0');
            const minutes = `${Math.floor((totalTime / 60000) % 60)}`.padStart(2, '0');

            return `${minutes} : ${getSeconds}`;
        };

    
        return(
            <div>
                <h2>{challenge.title}</h2>

                {/* display running time*/}
                <h1>{getFormattedTime(totalTime)}</h1> 

                {/*  Display Segment Times (snapshot of time when we ended the segment)*/}
                <table>
                    <tbody>
                        {segments.map((segment) => (
                            <tr key={segment.name}>
                                <td>{segment.name}</td>
                                <td>{getFormattedTime(segment.time)}</td>
                            </tr>
                        ))}
                    </tbody>
                    
                </table> {/*  tables are more accessible screen reader friendly!*/}

                <br></br>
                {/* While challenge runs, can click next segment and end challenge */}
                {isRunning ? (
                    <div>
                        <button onClick={handleClickNextSegment}>Next Segment</button>
                        <button onClick={handleClickEndChallenge} disabled={!isRunning}>
                            End
                        </button>
                        
                 </div>
                ) : !totalTime ? ( 

                    <button onClick={handleClickStart} disabled={isRunning}>
                        Start
                        {/* can only press start at very inital start challenge */}
                    </button>

                ) : null}

                {/* When run is finished, display message */}
                {!isRunning ? (
                    totalTime ? (<p>Amazing job!</p>) : null
                ) : null
                }
            </div>
        )
}

export default RunChallenge

// two col table
// name time

// ul -> table
// li -> table row
// name and time td


//if time is not 0 don't display. put by start

/* 
<ul>
                    {segments.map((segment) => (
                        <li key={segment.name}>
                            {segment.name} : {getFormattedTime(segment.time)}
                        </li>
                    ))}
                </ul>
                
                
                
                <h2>{challenge.title}</h2>
                <h1>{getFormattedTime(totalTime)}</h1>

                


                <table>
                    <tbody>
                        {segments.map((segment) => (
                            <tr key={segment.name}>
                                <td>{segment.name}</td>
                                <td>{getFormattedTime(segment.time)}</td>
                            </tr>
                        ))}
                    </tbody>
                    
                </table>

                <br></br>
                {isRunning ? (
                    <div>
                        <button onClick={handleClickNextSegment}>
                            Next Segment
                        </button>
                    </div>
                ) : (

                    
                    <div>
                        <button onClick={handleClickStart} disabled={totalTime > 0}>
                            Start
                        </button>
                    </div>

                )}
                    
        
                <button onClick={handleClickEndChallenge} disabled={!isRunning}>
                    End
                </button>
                
            </div>
                
                
                
                
                
                */
