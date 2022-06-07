// header/navbar for user posts so you can click between image, video, and tagged posts
import style from '../../styles/profile.css'
// FA imports
import { faTableCells, faCirclePlay, faImagePortrait } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function PostsHeader(props) {
    return(
        <div className="posts-header">
            <FontAwesomeIcon icon={faTableCells} size={"xl"} color={"rgb(200,200,200)"}/>
            <FontAwesomeIcon icon={faCirclePlay} size={"xl"} color={"rgb(200,200,200)"}/>
            <FontAwesomeIcon icon={faImagePortrait} size={"xl"} color={"rgb(200,200,200)"}/>
        </div>
    )
}

export default PostsHeader;