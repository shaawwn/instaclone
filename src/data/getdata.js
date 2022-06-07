import {getFirestore, collection, query, getDocs, getDoc, updateDoc, setDoc, doc} from 'firebase/firestore';

function test() {
    console.log("Testing path")
}
async function getData(db) {
    // get game objects from firestore database, returns promise
    const promiseData = {}
    const gameData = {}
    const querySnapshot = await getDocs(collection(db, "gameObjects"));
    querySnapshot.forEach((doc) => {
        // console.log(doc.data()["title"])
        promiseData[doc.data()['title']] = doc.data()
    })
    // return await getDocs(collection(db, "gameObjects")).data()
    return promiseData
    // return gameData
}

async function getUserObject(userId, collection, db) {
    // get object data using gameImage title
    const userRef = doc(db, collection, userId);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
        return await docSnap.data()
    } else {
        console.log("No such game data")
    }
}

async function getPostObject(postId, collection, db) {
  console.log("Loading post object data...")
  const postRef = doc(db, collection, postId)
  const docSnap = await getDoc(postRef)

  if (docSnap.exists()) {
    return await docSnap.data()
  } else{
    console.log("No such post")
  }
}

const testData = {
  user: "Shawn",
  image: "image.url",
  caption: "this is a test caption"
}
async function setData(dataObject, db) {
  await setDoc(doc(db, 'test', 'test data'), {
    name: dataObject['user'],
    image: dataObject['image'],
    caption: dataObject['caption']
  })
}

// setData(testData)
// async function addObject(gameObject, title) {
//   // console.log(gameObject, title.toString())
//   const gameTitle = title.toString()
//   const gameObjects = collection(db, "gameObjects")
//   await setDoc(doc(gameObjects, gameTitle), {
//     title: gameTitle,
//     image: gameObject.image,
//     characters: gameObject.characters,
//     topScores: gameObject.topScores
//   })
// }
// Script for adding objects to Firestore DB //
// console.log("Loading app", gameData)
// Object.keys(gameData).forEach(object => {
//   console.log(gameData[object])
//   addObject(gameData[object], object)
// })
export { getData, getUserObject, getPostObject, test }