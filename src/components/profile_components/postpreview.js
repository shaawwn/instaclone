// smaller 'preview' image representing a post in a users profile
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { useState, useEffect } from 'react';
import { getPostObject, getUserObject } from '../../data/getdata'
function PostPreview(props) {

    const [image, setImage] = useState()
    const [post, setPost] = useState()
    // props.image gives the image ID, need to access that
    // console.log("Loading previews", props)
    const db = props.firebaseDependencies[3]
    function getPostObject() {

    }


    function getImage(imageURL) {
        // download/link to image
        const storage = getStorage()
        const imageRef = ref(storage,`${imageURL}/` ) 
        console.log("IMAGE REF", imageRef)
        
        getDownloadURL(imageRef).then((url) => {
            console.log("URL:", url)
            setImage(url)
        })
    }

    useEffect(() => {
        const postObject = getUserObject(props['image'], 'posts', db)
        postObject.then(
            data => {
                getImage(data['imageURL'])
            }
        )

    }, [])
    return(
        <div className="post-preview">
            {/* <h1>This is a preview</h1> */}
            <img src={image} alt="my image"></img>
        </div>
    )
}

export default PostPreview