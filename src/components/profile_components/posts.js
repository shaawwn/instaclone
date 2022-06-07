// main container for user posts, includes a header that allows users to select between image, video, and tagged posts
import { useState, useEffect } from 'react';
import PostsHeader from './posts_header';
import PostPreview from './postpreview.js'

// FA
function Posts(props) {
    const [userPosts, setUserPosts] = useState()
    const [userDataLoaded, setUserDataLoaded] = useState(false)
    // console.log("User posts in posts", props.userPosts)

    function getPostImage() {
        // get the image from the db using the posts uniqid
    }

    useEffect(() => {
        setUserPosts(props.userPosts)
        console.log(userPosts)
        if (userPosts) {
            console.log("Loading user data")
            setUserDataLoaded(true)
        }
    }, [userPosts])
    return(
        <div className="profile-posts-container">
            <PostsHeader />
            <div className="posts-container">
                {userDataLoaded
                ? userPosts.map((post) => {
                    return <PostPreview image={post} firebaseDependencies={props.firebaseDependencies}/>
                })
                :<span>Nothing here</span>
                }
                {/* {userPosts.map((post) => {
                    return <PostPreview image={post} />
                })} */}

            </div>
        </div>
    )
}

export default Posts