import style from '../styles/login_register.css'
import { useState, useEffect } from 'react';

function LoginBox(props) {
    return(
        <div className="login-container">
            <h1 className="header">Instaclone</h1>
            <form className="login-form">
                <input type="text" placeholder="Enter telephone# or email address" />
                <input type="password" placeholder="Password" />
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
            <form className="login-form">
                <input type="text" placeholder="Mobile Number or Email" />
                <input type="text" placeholder="Full Name" />
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <input className="login-submit-btn" type="submit" value="Enter" />
            </form>
        </div>
    )
}

export { LoginBox, RegisterBox }