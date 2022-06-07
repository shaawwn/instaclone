import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import App from './App';
import Login from './Login'
import Register from './Register'
import UserProfile from './Profile';

// Firebase
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
function RouteSwitch(props) {
    const [userSignedIn, setUserSignedIn] = useState(false)

    const app = props.firebaseDependencies[1]
    const auth = getAuth(app)
    // signOut(auth)
    function signInUser() {
        console.log("Signing in user....")
        setUserSignedIn(true)
    }

    function signOutUser() {
        console.log("Signing out user")
        setUserSignedIn(false)
        signOut(auth)
    }


    useEffect(() => {

        onAuthStateChanged(auth, (user) => {
            if(user) {
                const uid = user.uid
                setUserSignedIn(true)
            } else {
                // console.log("Singing out user...")
                // signOut(auth)
                // setUserSignedIn(false)
                console.log("user signed out")
            }
        })
    }, [auth])
    return(
        <BrowserRouter>
            <Routes>
                {userSignedIn
                ?<Route path="/" element={<App firebaseDependencies={props.firebaseDependencies} signout={signOutUser}/>} />
                :<Route path="/" element={<Login firebaseDependencies={props.firebaseDependencies} signin={signInUser}/>} />
                }
                {/* <Route path="/" element={<App firebaseDependencies={props.firebaseDependencies}/>} /> */}
                {/* <Route path="/login" element={<Login firebaseDependencies={props.firebaseDependencies}/>} /> */}
                <Route path="/register" element={<Register firebaseDependencies={props.firebaseDependencies} signin={signInUser}/>} />
                <Route path="/profile" element={<UserProfile firebaseDependencies={props.firebaseDependencies} signout={props.signOutUser}/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default RouteSwitch