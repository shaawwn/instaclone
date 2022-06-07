import style from './styles/login_register.css'

import { LoginBox } from './components/login.js';
import GetAppsBox from './components/getapp.js';
function Login(props) {
    // Login page, which acts as instaclone home if user is not logged in
    return(
        <div className="Login">
            <LoginBox firebaseDependencies={props.firebaseDependencies} signin={props.signin}/>
            <GetAppsBox />
        </div>
    )
}

export default Login