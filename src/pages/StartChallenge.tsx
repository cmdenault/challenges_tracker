// This is the component containing the entire home page and choose challenge page

import { Link } from 'react-router-dom'

// import components we want
import ChallengeList from "../components/ChallengeList";


export default function StartChallenge() {

    // hooks and necessary functions

    return (
        <>

            <h2 className='start-header'> Let's Go! Start a Challenge:</h2>

            <ChallengeList />

            <br></br>
            <Link to={'/challenges/add'}>
                <button>+</button>
            </Link>
            
        </>
        
    )
}

// will it have a list of all challenges grouped with 
// should i make a listChallenges component? it contains a grouping of challenge 
    //info and button to take you to record challenge page




/* 

Clear Local Storage?

1. Add function under function section
    const handleClearStorage = () => {
        localStorage.clear();
        // Optionally, display a message or redirect after clearing
    };

2. Add button to jsx markup
    <div> 
        <button onClick={handleClearStorage}>Clear Local Storage</button>
    </div>

3. Refresh, click, refresh

*/


