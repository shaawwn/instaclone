// Home feed is the container that displays posts the user is following
import style from '../styles/style.css'
import ImagePost from './img_post';
function HomeFeed(props) {
    return(
        <div className="home-feed">
            <h1>Home feed here</h1>
            <ImagePost /> 
            {/* Set up dynamic image posts from users that user is following */}
        </div>
    )
}

export default HomeFeed