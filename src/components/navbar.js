import style from '../styles/navbar.css'

import { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { UploadImage } from './uploadimage';


// FA Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faPaperPlane, faSquarePlus, faCompass, faHeart, faUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

<FontAwesomeIcon icon="fa-solid fa-house" />



function Navbar(props) {
    const loadUploadImageModal = props.appFunctions[0] // Ok so this is causing an error when navbar loaded from another page
    // console.log("Props in nav", props)
    // let navigate = useNavigate();

    // function profileRedirect() {
    //     let navigate = useNavigate
    //     let path = 'profile';
    //     navigate(path)
    // }


    return(
        <div className="navbar">
            <Link to="/" className="navbar-title">Instaclone</Link>
            <div className="search-box">
                {/* <FontAwesomeIcon icon={faMagnifyingGlass} /> */}
                <input type="text" className="search-input" placeholder="Search" />
            </div>
            <div className="navbar-icons-container">
                <button onClick={props.signout}>Signout</button> {/* TEMPORARY*/}
                <FontAwesomeIcon icon={ faHouse } size={"2x"}/>
                <FontAwesomeIcon icon={ faPaperPlane} size={"2x"}/>
                <FontAwesomeIcon icon={ faSquarePlus } size={"2x"} onClick={loadUploadImageModal}/>
                <FontAwesomeIcon icon={ faCompass} size={"2x"}/>
                <FontAwesomeIcon icon={ faHeart } size={"2x"}/>
                <Link to="/profile" className="icon-link" ><FontAwesomeIcon icon={ faUser } size={"2x"} /></Link>  {/* User profile picture here*/}
            </div>

        </div>
    )
}

export default Navbar