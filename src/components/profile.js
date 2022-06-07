// Profile page for users, if signed in users profile, additional options are available (account settings, etc)

import { useState, useEffect } from 'react';
import Navbar from './navbar';

function ProfilePage(props) {
    return(
        <div className="profile">
            <Navbar />
            <h1>Profile here</h1>
        </div>
    )
}

export default ProfilePage;