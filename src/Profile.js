import style from './styles/login_register.css'
import { useState, useEffect } from 'react';
import Navbar from './components/navbar.js';
import UploadImage from './components/uploadimage';
// Profile components
import ProfileUserInfo from './components/profile_components/user_info'
import Posts from './components/profile_components/posts';

import { getUserObject } from './data/getdata';

const user = 'Shawn'
const userID= '1' // this is where shit needs to change
function UserProfile(props) {
    // Login page, which acts as instaclone home if user is not logged in
    const [uploadImageModal, setUploadImageModal] = useState(false)
    const [userProfile, setUserProfile] = useState() // the userObject of the currently viewed profile
    const [userPosts, setUserPosts] = useState()
    const [postsLoaded, setPostsLoaded] = useState(false)
    const db = props.firebaseDependencies[3]
    // const loadUploadImageModal = props.appFunctions[0]
    // console.log("Props in profile", props, loadUploadImageModal)
    
    // Need to load user data in profile, loading logged in user, or other user SHOULD be roughly the same, although there will
        // be differences between the logged in users profile and another users profile
        // just load users profile
    function loadUploadImageModal() {
        console.log("Loading image from profile")
        setUploadImageModal(true)
    }

    function closeUploadImageModal() {
        setUploadImageModal(false)
    }
    
    function getUserPosts(userObject) {
        // set the userPosts
        userObject.then(
            data => {
                setUserPosts(data.posts)
                setPostsLoaded(true)
            }
        )
    }
    useEffect(() => {
        const userData = getUserObject(userID, 'users', db)
        setUserProfile(userData)
        getUserPosts(userData)

    }, [])
    return(
        <div className="Login">
            <Navbar appFunctions={[loadUploadImageModal]} signout={props.signout}/>
            <hr></hr>
            <ProfileUserInfo />
            <hr></hr>
            {postsLoaded
            ? <Posts userPosts={userPosts} firebaseDependencies={props.firebaseDependencies}/>
            :<span></span>
            }
            {/* <Posts userPosts={userPosts}/> */}
            {uploadImageModal
            ? <UploadImage appFunctions={[closeUploadImageModal]}firebaseDependencies={props.firebaseDependencies}/>
            : <span></span>
            }
        </div>
    )
}

export default UserProfile