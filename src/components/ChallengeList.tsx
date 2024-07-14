// listing all challenges in local storage 

// libraries and such
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

// import models
import { Challenge as ChallengeModel} from "../model/Challenge"; // the interface


function ChallengeList() { // props: ChallengeListProps ?
    const [challenges, setChallenges] = useState<ChallengeModel[]>([]); // holds the challenges and the setter. initally empty

    // get the local storage list of Challenge objs
    useEffect(() => {
        const storedChallenges: ChallengeModel[] = JSON.parse(localStorage.getItem('challenges') || '[]');
        setChallenges(storedChallenges);
    }, []); // Empty dependency array ensures data is loaded only once

    return (
    <div>
        
        {/* Iterate through the challenges array */}
        {challenges.map((challenge) => (

            /* The bar objects in a challenge list */
            <div key={challenge.id} className="challenge-list-items">

                <h3>{challenge.title}</h3>
                {/* Go to Record Challenge Page*/}
                <Link to={`/challenges/${challenge.id}`}>
                    <button>{String.fromCodePoint(parseInt('23F1', 16))}</button>
                </Link>
                <br />

            </div>
        ))}
    </div>
    )
}

export default ChallengeList;




//////// how to route to other page
//// and send the id? so we know what challenge to show?


// <Link to={`/run-challenge/${challengeId}`}></Link>