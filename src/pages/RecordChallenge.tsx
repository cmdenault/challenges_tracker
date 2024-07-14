// This is the component containing the entire page for recording challenge

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


// import components we want
import RunChallenge from "../components/RunChallenge";

import { Challenge as ChallengeModel} from "../model/Challenge"; // the interface


export default function RecordChallenge() {

    // get the challenge object using id from path
    const hd = useParams(); // Extract id field from route parameter
    const { id : challengeId } = hd // the name needs to match the name of field param. we give a more descriptive alias
    const [challengeData, setChallengeData] = useState<ChallengeModel | undefined>();
    
    useEffect(() => {
        const storedChallenges: ChallengeModel[] = JSON.parse(localStorage.getItem('challenges') || '[]');

        const selectedChallenge = storedChallenges.find((challenge) => challenge.id === challengeId);
        setChallengeData(selectedChallenge);
    }, [challengeId]); // 


    return (
        <>
        
            {challengeData
                ? <RunChallenge challenge={challengeData}/>
                :<div>Error</div>
            }


        </>
        
    )
}




//////////////////////// cant get the object..... tries to run conditional before useState gets object?



// if challenge: <RunChallenge challenge={challengeData}/>
// else: do something 

// gets params from 




// will display data for one particular challenge
// start button and timer. dynamically display running time and each length of segment
// will also need to change state from start button to next segment and end?
    // need to be separate page?
// how to get one challenge's info and change it's info ?


// does each button get a component file?
// where does the 


// how to get the object to the 

/* 
using break points in console:

1. run code
2. go to sources tab, go to file of interest
3. add a break point right after code breaks (?)
4. hit refresh page
5. hover over variables to see what's in there
*/