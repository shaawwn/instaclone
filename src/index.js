import React from 'react';
import ReactDOM from 'react-dom/client';

import './fonts/blackjack/blackjack.otf';

import App from './App';
import RouteSwitch from './routeswitch'
import { getData, getUserObject, test } from './data/getdata.js';
import { createUser, updateUserData, addFollower, 
        getFollowers,addPost, uploadImage } from './data/setdata.js';
// Firebase
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {getFirestore, collection, query, getDocs, getDoc, updateDoc, setDoc, doc} from 'firebase/firestore';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAk-bjIcxy-iYXeW2CU6Rt9UrO-uD_J0a8",
  authDomain: "instaclone-56ac7.firebaseapp.com",
  projectId: "instaclone-56ac7",
  storageBucket: "instaclone-56ac7.appspot.com",
  messagingSenderId: "19221053359",
  appId: "1:19221053359:web:aae0a810817c5d4ac0795a"
};

// Firebase app
const app = initializeApp(firebaseConfig)
const root = ReactDOM.createRoot(document.getElementById('root'));

// Firebase db object
const db = getFirestore(app);
const auth = getAuth(app)
console.log("Auth:", auth)

const fireBaseDependencies = [
  firebaseConfig, app, root, db
]
const testUserData = {
  id: '1', // autogenerate probably in the future
  username: 'Shawn',
  posts: [],
  followers: [],
  following: []
}

const testFollowerData = {
  id: '2',
  username: 'Chester',
  posts: [],
  followers: [],
  following: []
}

const testPost2 = {
  image: 'image.url',
  caption: 'This is my second post',
  comments: [],
  likes: 0
}

const userObject = getUserObject(testUserData['id'], 'users', db)
let followers = []
userObject.then(
  data => {
    data.followers.forEach((follower) => {
      // console.log("Follower to add", follower, userObject)
      // if(followers.includes(follower)) {
      //   console.log("Following alreadyx", getUserObject)
      // }
      followers.push(getUserObject(follower, 'users', db)) // not actuall writing it

    })
  }
)

// let userPostData = getUserObject(testUserData['id'], 'users', db)
// addPost(db, 'users', userPostData, testPost2)
// addFollower(db, 'users', testUserData, 'followers', testFollowerData) // db, collection, userDataObject, followers, followerReference)
// createUser(db, 'users', testUserData)
// createUser(db, 'users', testFollowerData)
// uploadImage('../images/spacestation.png')
// updateUserData(db, 'users', testUserData, 'followers', testFollowerData) // db, collection, dataObject, fieldToUpdate, toUpdateValue
root.render(
  <React.StrictMode>
    {/* <App firebase={app} followers={followers}/> */}
    <RouteSwitch firebaseDependencies={fireBaseDependencies}/>
  </React.StrictMode>
);

