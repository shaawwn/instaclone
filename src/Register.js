import style from './styles/login_register.css';
import { RegisterBox } from './components/login.js';
import GetAppsBox from './components/getapp.js';
function Register(props) {
    // Users can create new accounts here
    return(
        <div className="Register">
            <RegisterBox firebaseDependencies={props.firebaseDependencies} signin={props.signin}/>
            <GetAppsBox />
        </div>
    )
}

export default Register