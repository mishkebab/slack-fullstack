import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import SlackIcon from "./../../assets/slack-icon.png"
import * as sessionActions from '../../store/session';
import './navBar.css'

function Navigation() {
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout())
        
    }

    const loginDemo = () => {
        dispatch(sessionActions.login({ email: "hermione@hogwarts.edu", password:"password" }));
    }

    return (sessionUser) ? (
        <div className="nav-bar">
            <div class="nav-bar-right">
                <div class="slack-logo-home">
                    <img src={SlackIcon} />
                    <span class="slack-logo-name-home">scroll</span>
                </div>
                <ul>
                    <a className="nav-bar-link" href="https://www.google.com">Portfolio</a>
                    <a className="nav-bar-link" href="https://www.linkedin.com/in/mishabansal/">LinkedIn</a>
                    <a className="nav-bar-link" href="https://github.com/mishkebab">GitHub</a>
                </ul>
            </div>
            <ul class="nav-bar-logout-signup-buttons">
                <Link to="/">
                    <button className="nav-demo" onClick={logout} id="nav-logout">Logout</button>
                </Link>
            </ul>
        </div>
    ) : (
        <div className="nav-bar">
            <div class="nav-bar-right">
                <div class="slack-logo-home">
                    <img src={SlackIcon} />
                    <span class="slack-logo-name-home">scroll</span>
                </div>
                <ul>
                    <a className="nav-bar-link" href="https://www.google.com">Portfolio</a>
                    <a className="nav-bar-link" href="https://www.linkedin.com/in/mishabansal/">LinkedIn</a>
                    <a className="nav-bar-link" href="https://github.com/mishkebab">GitHub</a>
                </ul>
            </div>
            <ul class="nav-bar-logout-signup-buttons">
                <a className="nav-bar-link" href="/login">Log in</a>
                <a id="nav-signup" href="/signup">Sign up Here</a>
                <Link to="/">
                    <button className="nav-demo" onClick={loginDemo}>Try a Demo</button>
                </Link>
            </ul>
        </div>
    )
}

export default Navigation