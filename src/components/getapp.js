// Component for displaying Apple/Play Store image links
import AppStore from '../images/appstore.png'

function GetAppsBox(props) {
    return(
        <div className="get-apps-container">
            <p>Get the app</p>
            <div className="app-links-container">
                <a href="#">
                    <img src={ AppStore } alt="appstore" />
                </a>
                <a href="#">
                    <img src={require('../images/playstore.png')} alt="playstore" />
                </a>
            </div>
        </div>
    )
}

export default GetAppsBox