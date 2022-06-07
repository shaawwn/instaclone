import {getFirestore, collection, query, getDocs, getDoc, updateDoc, setDoc, doc} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getData, getUserObject } from './getdata.js'
import { uniqid } from 'uniqid';
// import { file } from 'file';
const testData = {
    user: "Shawn",
    image: "image.url",
    caption: "this is a test caption"
  }

const testUserData = {
    id: '1',
    username: 'Shawn',
    posts: '', // posts as a list of JSON objects?
    comments: '',
    likedPosts: '',
    followers: ['2', '4'],
    following: ['2', '3']
}

const testPostData = {
    id: `userId + postId`,
    user: '',// userRef 
    image: '',
    caption: '',
    comments: [], // array of commentRefs
    likes: [] // array of userRefs, # of which are the number of likes 
}

const testCommentData = {
    id: `userId + commentId`,
    user: 'userId', // can get user from userID
    comment: '',
    likes: 0,
    post: '' // maybe instead of this, the post gets created as simply as possible, then a ref to it is made in PostData
}

// Users, posts, comments
async function createUserAccountObject(db, collection, userID, fullname, username) {
    // userData as new user data object {username, posts, comments, likedPosts, followers, following}
    // db as firestore database to write data to
    await setDoc(doc(db, collection, userID), { // (database, collection, document)
            id: userID, // id needs to be the user.uid
            username: username, // username maybe 
            fullname: fullname,
            // password: 'password', // no need password since it is stored in firebase user object
            posts: [],
            followers: [], // array of followers user references
            following: [] // array of following user references
    })
}

async function updateUserData(db, collection, dataObject, fieldToUpdate, toUpdateValue) {
    // update document in firestore db
    // db.collection(collectionName).doc(doc.title).update({toUpdate: newValue})
    // needs to access the user Object, which means need the UID?
    const docRef = doc(db, collection, dataObject['username'])
    await updateDoc(docRef, {
        [fieldToUpdate]: toUpdateValue
    })
}


async function addFollower(db, collection, userDataObject, followers, newFollower) {
    // add 'follower' to a users followers list
    // when user clicks 'Follow' on a user, add to the clicked users follow list
    // update document in firestore db
    // db.collection(collectionName).doc(doc.title).update({toUpdate: newValue})
    getUserObject(userDataObject['id'], 'users', db).then(
        data => {
            const userRef = doc(db, collection, data['id'])

            // check that user is not already following
            if(data.followers.includes(newFollower['id'])) { 
                console.log("Already following")
                return false
            }

            // else push new follower to list and update database
            data.followers.push(newFollower['id'])
            updateDoc(userRef, {
                [followers]: data.followers
            })
        }
    )
}

async function addPost(db, collection, userDataObject, post) {
    // add to users 'posts'
    // post is image URL, caption, comments (emtpy initially), and likes (None, initally)
    // try assuming that userDataObject is a promise, so I don't need to constantly call getUserObject
    userDataObject.then(
        data => {
            const userRef = doc(db, collection, data['id'])

            //
            data.posts.push(post)
            updateDoc(userRef, {
                'posts': data.posts
            })
        }
    )
}

async function createPost(db, collection, userDataObject, post) {
    // create a post object/document to add to database, as well as update
    // users POSTS with the new post unique ID
    console.log("Creating post and updating user posts data")
    // console.log("DB:", db, "COL:", collection, "USER:", userDataObject, "POST:", post)
    // submit POST to database under 'posts' collection
    await setDoc(doc(db, collection, post['id']), {
        id: post['id'],
        imageURL: post['imageURL'],
        data: post['data']
    })

    // UPDATE user object posts to include postID as id of post
    userDataObject.then(
        data => {
            // console.log(data)
            const userRef = doc(db, 'users', data['id'])

            data.posts.push(post['id'])
            // console.log(post)
            updateDoc(userRef, {
                [collection]: data.posts
            })
        }
    )

}
async function getFollowers(db, collection, userDataObject, followers) {
    // return an array of followers data for a user
    getUserObject(userDataObject['id'], 'users', db).then(
        data => {
            return data.followers
        }
    )
}

async function uploadImage(imageURL, image, userID) {
    // upload image to firebase storage, path as '/images/userID/image.filetype
    // userID as unique user
    const storage = getStorage();

    // Create file metadata
    const metadata = {
        contentType: 'image/png' // png, jpg, etc
    }

    const storageRef = ref(storage, `images/1/` + image.name)
    const uploadTask = uploadBytesResumable(storageRef, image, metadata);

    // console.log("References: ", storageRef)
}


export { createUserAccountObject, updateUserData, 
    addFollower, getFollowers, 
    addPost, createPost, uploadImage }