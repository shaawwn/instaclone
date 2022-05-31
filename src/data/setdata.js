import {getFirestore, collection, query, getDocs, getDoc, updateDoc, setDoc, doc} from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { getData, getUserObject } from './getdata.js'
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
async function createUser(db, collection, dataObject) {
    // userData as new user data object {username, posts, comments, likedPosts, followers, following}
    // db as firestore database to write data to
    await setDoc(doc(db, collection, dataObject['id']), { // (database, collection, document)
            id: dataObject['id'],
            username: dataObject['username'],
            password: 'password', // CHANGE LATER
            posts: dataObject['posts'],
            followers: dataObject['followers'], // array of followers user references
            following: dataObject['following'] // array of following user references
    })
}

async function updateUserData(db, collection, dataObject, fieldToUpdate, toUpdateValue) {
    // update document in firestore db
    // db.collection(collectionName).doc(doc.title).update({toUpdate: newValue})
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
async function getFollowers(db, collection, userDataObject, followers) {
    // return an array of followers data for a user
    getUserObject(userDataObject['id'], 'users', db).then(
        data => {
            return data.followers
        }
    )
}

async function uploadImage(imageUrl) {
    // upload an image to firestore db
    const storage = getStorage()
    const img = new Image()
    img.src = imageUrl
    // console.log(img)
    const imageRef = ref(storage, imageUrl)
    // console.log(imageRef.name, imageRef.fullPath)
    const file = new File([], imageRef.name)
    // console.log(file)
    // uploadBytes(imageRef, file).then((snapshot) => {
    //     console.log("Uploaded image!")
    // })
}
export { createUser, updateUserData, 
    addFollower, getFollowers, 
    addPost, uploadImage }