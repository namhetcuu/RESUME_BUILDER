import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Home/Dashboard'
import EditResume from './pages/ResumeUpdate/EditResume'

const App = () => {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path='/' element={<LandingPage/>}></Route>

            {/* <Route path='/signIn' element={<SignIn/>}></Route>
            <Route path='/signUp' element={<SignUp/>}></Route> */}

            <Route path='/dashboard' element={<Dashboard/>}></Route>

            <Route path='/resume/:resumeId' element={<EditResume/>}></Route>
          </Routes>
        </Router>
      </div>
      <Toaster
        toastOptions={{
          className:"",
          style:{
            fontSize:"13px"
          }
        }}
      />
    </>
  )
}

export default App