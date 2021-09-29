import React, { useContext } from 'react';
import Card from './card';
import { UserContext, ActiveUserXContext } from '../index.js'
import Cookies from 'universal-cookie';

export default function Login(){
    const [show, setShow]         = React.useState(true);
    const [status, setStatus]     = React.useState('');
    const { value, setValue } = useContext(UserContext);
    const { activeUserX, setActiveUserX } = useContext(ActiveUserXContext);
    function validate(field, label){
        if (!field) {
          setStatus('Error: ' + label);
          setTimeout(() => setStatus(''),3000);
          return false;
        }
        return true;
      }

      function clearForm(){
        setShow(true);
        setStatus('');
      }

      function successfulLogin(){
          setStatus('You logged in! 🎉');
          setShow(false);
      }

      function failedLogin(){
          setStatus('Oh no!  Login failed. 😲 Check your credentials and try again');
      }

      function updateActiveUser(userIndexPosition){
        let activeUser = value[userIndexPosition].email;
        const cookies = new Cookies();
        cookies.set('activeUser', activeUser, { path: '/'});
        console.log(`the active user from cookie is ${cookies.get('activeUser')}`);
        setStatus('User not found.  Try again');
        setActiveUserX(activeUser);
        console.log(JSON.stringify(value));
        console.log(`active user is ${activeUser}`);
      }
    
      function handleLogin(){
        let emailValue = document.getElementById('email').value;
        console.log(emailValue);
        let passwordValue = document.getElementById('password').value;
        console.log(passwordValue);
        console.log(`user submitted : ${emailValue} & ${passwordValue}`);
        if (!validate(emailValue,    'email'))     return;
        if (!validate(passwordValue, 'password'))  return;

        let userExistsAtIndex = value.findIndex((user) => {
          return user.email === emailValue && user.password === passwordValue
        })
        if (userExistsAtIndex > -1) {
          console.log(`Submitted credentials match the user at index ${userExistsAtIndex}`);
        }
        else {
          console.log('No user with matching credentials was found');
        }
        
        let userIndexPosition = value.findIndex((user) => {
            return user.email === emailValue && user.password === passwordValue
        })
        
        if (userIndexPosition > -1) {
          updateActiveUser(userIndexPosition);
          successfulLogin();
          return;
        }
        failedLogin();

      }
    
      return (
        <Card
          bgcolor="primary"
          header="Log In"
          status={status}
          body={show ? (
              <>
                Email address
                <br />
                <input
                  type="input"
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                />
                <br />
                Password
                <br />
                <input
                  type="input"
                  className="form-control"
                  id="password"
                  placeholder="Enter password"
                />
                <br />
                <button
                  type="submit"
                  className="btn btn-light"
                  onClick={handleLogin}
                >
                  Log in!
                </button>
                
              </>
            ) : (
              <>
              <h5>You are now logged in!</h5>
              <button
                  type="submit"
                  className="btn btn-light"
                  onClick={clearForm}
                >
                  Log in as another user
              </button>
              </>
            )}
        />
      )
  }