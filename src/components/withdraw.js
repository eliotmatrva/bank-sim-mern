import React, { useContext, useEffect } from 'react';
import Card from './card';
import { ActiveUserXContext } from '../index.js'
import { ErrorMessage, Field, Formik, Form } from 'formik';
import ErrorText from './ErrorText'
import * as Yup from 'yup';

export default function Withdraw(){
  const { activeUserX } = useContext(ActiveUserXContext);
  const [withdraw, setWithdraw] = React.useState('');
  let [withdrawUser, setWithdrawUser] = React.useState();
  let withdrawerClone = {...withdrawUser};

  useEffect(() => {
    async function fetchUser(){
      let email = activeUserX;
      await fetch(`http://localhost:8081/users/findUser/${email}`, {method: 'GET'})
      .then(response => response.json())
      .then(data => setWithdrawUser(data));
    }
    fetchUser();
  }, [withdrawUser]);

    function clearForm(){
      console.log("you cleared it");
    }
  
    function handleWithdraw(values){
      let newBalance = parseInt(withdrawerClone.balance) - parseInt(values.withdraw);
      updateUserBalance(newBalance);
      alert(`Congratulations! 💰💸🤑 You deposited ${values.withdraw}`);
    }

    function updateUserBalance(newBalance){
      let email = activeUserX;
      let balance = parseInt(newBalance);
      fetch(`http://localhost:8081/users/updateBalance/${email}/${balance}`, {method: 'PUT'})
      .then(response => response.text())
      .then(data => {
        console.log(data);
      })
    };

    const validate = Yup.object({
      withdraw: Yup.number()
      .min(1, 'Must withdraw at least $1')
      .required('Withdraw amount is required')
      .max(withdrawerClone.balance, 'You do not have enough money'),
    });  

  return (
    <>
      {!activeUserX ? (
        <p>Please <a href="#/login/">Login</a> to access withdrawls</p> 
        ) : (
        <Card
          bgcolor="primary"
          txtcolor="white"
          header={`${withdrawerClone.name}'s current balance:  $${withdrawerClone.balance}`}
          title=""
          body={(
            <Formik
              initialValues = {{
                withdraw: withdraw
              }}
              validationSchema={validate}
              onSubmit={handleWithdraw}
          >
            {formik => (
                <div>
                    <p>Enter an amount greater than $1 then click "Withdraw Funds"</p>
                    <Form>
                        <Field
                            label="Withdraw"
                            name="withdraw"
                            type="number"
                            placeholder="Enter withdraw amount"
                            className="form-control"
                            id="withdraw"
                            autoComplete="off"
                        />
                        <ErrorMessage name="withdraw" component={ErrorText} />
                        <br />
                        <button
                            type="submit"
                            className="btn btn-light"
                        >
                            Withdraw Funds
                        </button>
                        <button
                          type="Reset"
                          className="btn btn-danger"
                          style={{marginLeft: 2 + 'px'}}
                          onClick={clearForm}
                        >
                          Reset
                        </button>
                    </Form>
                </div>
            )}
          </Formik>
          )}
      />
      )}
      
           
    </>
  )
}