import { useState, useEffect } from 'react'

import style from './styles/style.css'
import Navbar from './components/navbar';
import HomeFeed from './components/homefeed';
import UploadImage from './components/uploadimage';
import Profile from './Profile'

function App(props) {
  const [userSignedIn, setUserSignedIn] = useState(false)

  const [uploadImageModal, setUploadImageModal] = useState(false)
  function loadUploadImageModal() {
    // open the modal for uploading an image
    console.log("Uploading image from app")
    setUploadImageModal(true)
  }

  function closeUploadImageModal() {
    setUploadImageModal(false)
  }

  useEffect(() => {

  }, [])
  return (
    <div className="App">
      <Navbar appFunctions={[loadUploadImageModal]} firebaseDependencies={props.firebaseDependencies} signout={props.signout}/>
      <hr />
      <HomeFeed />
      {uploadImageModal
      ? <UploadImage appFunctions={[closeUploadImageModal]} firebaseDependencies={props.firebaseDependencies}/>
      : <span></span>
      }
    </div>
  );
}

export default App;
