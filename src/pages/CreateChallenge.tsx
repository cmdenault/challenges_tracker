// This is the component containing the entire page for creating new challenge

// import components we want
import NewChallengeForm from "../components/NewChallengeForm";

export default function CreateChallenge() {
    return (
        <>

            <h2> Create New Challenge </h2>

            <NewChallengeForm />
        </>
        
    )
}

// contains a form to create a new challenge

// make an object from user input and add to local storage challenges array
// do we need the Challenge component?