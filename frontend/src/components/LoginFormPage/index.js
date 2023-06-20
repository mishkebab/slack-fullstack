import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './loginForm.css'
import { ReactComponent as SlackSVG } from '../../assets/slack-icon.svg';


function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ email, password }))
            .catch(async (res) => {
                let data;
                try {
                // .clone() essentially allows you to read the response body twice
                data = await res.clone().json();
                } catch {
                data = await res.text(); // Will hit this case if the server is down
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            });
    }

  return (
    <>
      <div id="logo">
        <SlackSVG/>
        <h1 id="text-logo">scroll</h1>
      </div>
      <div class="form-container">
        <form onSubmit={handleSubmit} id="login-form">
          <h1 class="form-heading">Sign in to Scroll</h1>
          <p class="form-subheading">We suggest using the <strong>email address you use at work.</strong></p>
          <ul>
            {errors.map(error => <li key={error}>{error}</li>)}
          </ul>
          <div class="login-page">
            <hr></hr>
          </div>
          <label>
            <input
              class="signup-form-input"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@work-email.com"
              required
            />
          </label>
          <br />
          <label>
            <input
              class="signup-form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              required
            />
          </label>
          <br />
          <button type="submit" class="signup-form-button">Sign In With Email</button>
        </form>
        <span class="span-or">or</span>
        <button class="signup-form-button">Try a Demo</button>
      </div>
    </>
  );
}

export default LoginFormPage;