import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from "react-router-dom";
// import './index.css';
import reportWebVitals from './reportWebVitals';
import NavBar from './components/navbar'
// import 'bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import CreateAccount from './components/createaccount2'
import AllData from './components/alldata3'
import Home from './components/home'
import Login from './components/login'
import Withdraw from './components/withdraw'
import Deposit from './components/deposit'
//import Balance from './components/balance'
export const UserContext = React.createContext(null);
export const ActiveUserXContext = React.createContext(null);

function Spa() {

  const [value, setValue] = useState(null);
  const [activeUserX, setActiveUserX] = useState('');

  useEffect(() =>{
    let allUsers;
     fetch('http://localhost:8081/api/users', {method: 'GET'})
    .then(response => response.json())
    .then(data => {
      allUsers = data;
      setValue(allUsers);
      console.log(data);
    })
    .catch(function(error) {
      console.log(error);
    });
  }, []);

  return(
    <HashRouter>
        <ActiveUserXContext.Provider
          value={{ activeUserX, setActiveUserX }}
        >
          <UserContext.Provider 
            value={{ value, setValue }}
          >
          <NavBar/>
            <Route path="/" exact component={Home} />
            <Route path="/CreateAccount/" component={CreateAccount} />
            <Route path="/login/" component={Login} />
            <Route path="/deposit/" component={Deposit} />
            <Route path="/withdraw/" component={Withdraw} />
            <Route path="/alldata/" component={AllData} />
          </UserContext.Provider>
        </ActiveUserXContext.Provider>
    </HashRouter>
  );
}


ReactDOM.render(
  <React.StrictMode>
    <Spa />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
