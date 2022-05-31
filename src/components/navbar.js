import style from '../styles/navbar.css'

import { useState, useEffect } from 'react';
import { UploadImage } from './uploadimage';


// FA Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faPaperPlane, faSquarePlus, faCompass, faHeart, faUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

<FontAwesomeIcon icon="fa-solid fa-house" />



function Navbar(props) {
    const loadUploadImageModal = props.appFunctions[0]

    return(
        <div className="navbar">
            <p className="navbar-title">Instaclone</p>
            <div className="search-box">
                {/* <FontAwesomeIcon icon={faMagnifyingGlass} /> */}
                <input type="text" className="search-input" placeholder="Search" />
            </div>
            <div className="navbar-icons-container">
                <FontAwesomeIcon icon={ faHouse } size={"2x"}/>
                <FontAwesomeIcon icon={ faPaperPlane} size={"2x"}/>
                <FontAwesomeIcon icon={ faSquarePlus } size={"2x"} onClick={loadUploadImageModal}/>
                <FontAwesomeIcon icon={ faCompass} size={"2x"}/>
                <FontAwesomeIcon icon={ faHeart } size={"2x"}/>
                <FontAwesomeIcon icon={ faUser } size={"2x"} />  {/* User profile picture here*/}
            </div>

        </div>
    )
}

export default Navbar