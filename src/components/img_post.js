// Component for displaying User psots
import { useState, useEffect} from 'react'
import style from '../styles/post.css';
import SpaceStation from '../images/spacestation.png';
import Julio from '../images/jrod.jpeg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faPaperPlane, faSquarePlus, faCompass, faHeart, faUser, faMagnifyingGlass, faEllipsis, faBookmark, faCircle } from '@fortawesome/free-solid-svg-icons'
// import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import { faHeart as faHeartOutline, faComment, 
        faBookmark as faBookmarkOutline, 
        faPaperPlane as faPaperPlaneOutline,
        faCircle as faCircleOutline } from '@fortawesome/free-regular-svg-icons'




function ImagePost(props) {
    const [liked, setLiked] = useState(false) // heart icon is solid or outline
    const [saved, setSaved] = useState(false)
    const [multiple, setMultiple] = useState(true)
    const [numImages, setNumImages] = useState(2)

    useEffect(() => {
        // TODO 
    }, [])

    return(
        <div className="image-post">
            <div className="image-post-banner">
                <FontAwesomeIcon icon={faUser}/>
                <p>Shawn</p>
                <FontAwesomeIcon icon={faEllipsis} />
            </div>
            <div className="image-post-image">
                <img alt="spacestation" src={SpaceStation} />
            </div>
            <div className="image-post-footer">
                <div className="like-comment-send-icons">
                    {liked
                    ? <FontAwesomeIcon icon={faHeart} color={'red'} size={"2xl"} />
                    : <FontAwesomeIcon icon={faHeartOutline} size={"2xl"} />
                    }
                    <FontAwesomeIcon icon={faComment} size={"2xl"}/>
                    <FontAwesomeIcon icon={faPaperPlaneOutline} size={"2xl"} />
                </div>
                {multiple
                ? <div className="post-pagination-circles">
                        <FontAwesomeIcon icon={faCircle} size={"xs"}/>
                        <FontAwesomeIcon icon={faCircleOutline} size={"xs"}/>
                        <FontAwesomeIcon icon={faCircleOutline} size={"xs"}/>
                        <FontAwesomeIcon icon={faCircleOutline} size={"xs"}/>
                    </div>
                : <span></span>
                }
                {saved
                ? <FontAwesomeIcon icon={faBookmark} size={"2xl"}/>
                : <FontAwesomeIcon icon={faBookmarkOutline} size={"2xl"}/>
                }
            </div>
        </div>
    )
}

export default ImagePost