// The main Application page. Route to our different pages

import { HashRouter, Route, Routes } from 'react-router-dom' // using HashRouter instead of BrowserRouter 


//
import StartChallenge from './pages/StartChallenge'
import RecordChallenge from './pages/RecordChallenge'
import CreateChallenge from './pages/CreateChallenge'

import './App.css'

function App() {

  return (
    <>
        <HashRouter>
          <Routes>

            <Route path='/' element={<StartChallenge />} />

            <Route path='/challenges/:id' element={<RecordChallenge />} /> {/* /challenges/:id takes in the challenge's id from path?*/}

            <Route path='/challenges/add' element={<CreateChallenge />} />

          </Routes>
        </HashRouter>
    </>
  )
}

export default App

// look for hook for inside of useRouter, use params to get id


// npm create vite@latest ()
// ..... 
// install: 
// react router, react router dom, uuid, moment, etc...
// npm install @types/moment-duration-format --save-dev