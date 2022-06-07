// component to display user information such as profile image, username, and visible account details
import style from '../../styles/profile.css';
import Odlaw from '../../images/odlaw.png'
import { faEllipsis, faUserCheck, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ProfileUserInfo(props) {
    return(
        <div className="profile-user-info">
            <div className="profile-picture-details">
                <img src={Odlaw} className="profile-picture" alt="user profile"></img>
                <div className="account-details-container">
                    <div className="profile-username">
                        <p className="username">Username</p>
                        <FontAwesomeIcon icon={faEllipsis} size={"2xl"} className="fa-ellipsis"/>
                    </div>
                    <div className="account-interaction">
                        <div className="profile-button">
                            <p>Message</p>
                        </div>
                        <div className="profile-button following">
                            <FontAwesomeIcon icon={faUserCheck} />
                        </div>
                        <div className="profile-button options">
                            <FontAwesomeIcon icon={faAngleDown} />
                        </div>
                    </div>
                </div>
            </div>
            <p>User Full name</p>
            <div className="shared-followers">
                <p className="light-text">Followed by</p>
                {/* Loop users here */}
                <p className="bold-text">User 1</p>
                <p className="bold-text">User 2</p>
                <p className="bold-text">User 3</p>
                <p className="light-text">+2 more</p>
            </div>
            <hr></hr>
            <div className="post-followers-following">
                <div className="pff-nums">
                    <p>16</p>
                    <p className="light-text">posts</p>
                </div>
                <div className="pff-nums">
                    <p>42</p>
                    <p className="light-text">followers</p>
                </div>
                <div className="pff-nums">
                    <p>216</p>
                    <p className="light-text">following</p>
                </div>
            </div>
        </div>
    )
}

export default ProfileUserInfo