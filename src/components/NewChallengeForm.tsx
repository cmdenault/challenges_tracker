import {useState} from 'react'
// import React ? what is it used for?

//import Challenge from './Challenge'; // the interface the form's data should look like
import {v4 as uuidv4} from 'uuid';

import { useNavigate } from 'react-router-dom';

//
// interface FormProps {

// }

interface Challenge {
    id: string;
    title: string;
    locations: string[];
}



export default function NewChallengeForm() {
    
    // any necessary functions

    // the hooks
    const [title, setTitle] = useState('') // empty string functions?
    const [locations, setLocations] = useState<string[]>([]) // initial value is empty string?
                // setLocations is a provided setter funtion for the locations array

    // call back function



    // so typed titles show up on screen
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };
    
    // so locations show up on screen
    const handleLocationChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedLocations = [...locations];
    updatedLocations[index] = event.target.value;
    setLocations(updatedLocations);
    };



    // add a location
    const handleAddLocation = () => {
        setLocations([...locations, '']); // make the locations one bigger when we want to add another location
    }

    // trash a location 
    const handleRemoveLocation = (index: number) => {
        if (locations.length > 1) {
            const updatedLocations = [...locations];
            updatedLocations.splice(index, 1);
            setLocations(updatedLocations);
        }
    }

    // submit
    const navigate = useNavigate();
    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        // validate basic requirements
        if (!title || locations.length === 0) {
            alert('Please enter a title and at least one location')
            return;
        } 

        // new challenge object
        const aUniqueId = uuidv4() // create a uuid
        const newChallenge: Challenge = { //// can i use the model import or shoulf i make another interface???????????
            title,
            locations,
            id: aUniqueId // can i do this????????
        }

        // add newChallenge to LocalStorage
        const storedChallenges: Challenge[] = JSON.parse(localStorage.getItem('challenges') || '[]');
        storedChallenges.push(newChallenge);
        localStorage.setItem('challenges', JSON.stringify(storedChallenges));

        setTitle('');
        setLocations([]); // Reset form after submission

        alert('Challenge created successfully!')

        // reroute to home page
        navigate('/');
      }

    // the jsx markup!
    return (
        <form
         onSubmit={handleSubmit}
        >
            
            <label>
                Name:  
            </label>
            <input name="title" id="title" type="text" value={title} placeholder='My New Challenge!' onChange={handleTitleChange}/> {/* don't need an onChange? just read in when u click submit??*/}
            <br />

            <h3> Segments</h3>
            {locations.map((location, index) => ( 
                <div key={index}>
                    <label>Location {index + 1}: </label>
                    <input
                        type="text"
                        id={`location-${index}`}
                        value={location}
                        onChange={(event) => handleLocationChange(index, event)}
                    />
                    <button type="button" onClick={() => handleRemoveLocation(index)}>
                        Remove
                    </button>

                    <br />
                </div>
            ))}

            <button type="button" onClick={handleAddLocation}>
                Add Location
            </button>
            <br />


            <button type="submit">Create Challenge</button> {/* automatically goes to handle submit?*/}
        
        </form>
    )
}

// const aUniqueId = uuid.v4() // create a uuid

// need this in line 91? {/*  id={`location-${index}`} */} what is ID for in this form?
// {/*  need onChange handler?? ??*/}


// so is it saved in local storage? do i need to declare anywhere?