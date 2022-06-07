import style from '../styles/login_register.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, userCredential } from 'firebase/auth';

import { createUserAccountObject } from '../data/setdata.js';

function LoginBox(props) {
    const app = props.firebaseDependencies[1]
    const auth = getAuth(app)
    const navigate = useNavigate()

    function signIn(e) {
        e.preventDefault() // Page was reloading before authentication could complete?
        console.log("Signing in start")
        const email = e.target.contact.value
        const password = e.target.password.value
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                props.signin() // set app signed in status to true
                navigate("/")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message
            })
    }
    return(
        <div className="login-container">
            <h1 className="header">Instaclone</h1>
            <form className="login-form" onSubmit={signIn}>
                <input type="text" name="contact" placeholder="Enter telephone# or email address" />
                <input type="password" name="password" placeholder="Password" />
                <input className="login-submit-btn" type="submit" value="Enter" />
                <div className="linebreak-container">
                    <hr className="linebreak left" />
                    <p>OR</p>
                    <hr className="linebreak right" />
                </div>
                <p>New to instagram? <a href="/register">Create Account</a></p>
            </form>
        </div>
    )
}

function RegisterBox(props) {
    
    const app = props.firebaseDependencies[1]
    const db = props.firebaseDependencies[3]
    const auth = getAuth(app)
    const navigate = useNavigate()
    async function createUser(e) {
        // get email and password from registration form
        e.preventDefault()
        const email = e.target.contact.value
        const password = e.target.password.value;
        const fullname = e.target.fullname.value;
        const username = e.target.username.value;
        console.log(email, password)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                // Create userObject here with user.uid as the username key, get rid of password, maybe username
                createUserAccountObject(db, 'users', user.uid, fullname, username)
                props.signin() // signs in user to app
                navigate("/") // after user signs in, redirect to homepage as a signed in user, which will oad the homefeed
         
            })
            .catch((error) => {
                console.log("There was an error creating user.")
                const errorCode = error.code;
                const errorMessage = error.message
                console.log(errorCode, errorMessage)
            })
    }

    return(
        <div className="login-container">
            <h1 className="header">Instaclone</h1>
            <div>
                <p>Sign up to see photos and videos from your friends</p>
            </div>
            <button className="login-submit-btn">Log In With Google</button>
            <div className="linebreak-container">
                <hr className="linebreak left" />
                <p>OR</p>
                <hr className="linebreak right" />
            </div>
            <form className="login-form" onSubmit={createUser}>
                <input type="text" name="contact" placeholder="Mobile Number or Email" />
                <input type="text" name="fullname" placeholder="Full Name" />
                <input type="text" name="username" placeholder="Username" />
                <input type="password" name="password" placeholder="Password" />
                <input className="login-submit-btn" type="submit" value="Enter" />
            </form>
        </div>
    )
}

export { LoginBox, RegisterBox }