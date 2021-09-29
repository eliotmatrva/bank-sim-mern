import React, { useContext, useEffect } from 'react';
import Card from './card';
import { ActiveUserXContext } from '../index.js'
import { ErrorMessage, Field, Formik, Form } from 'formik';
import ErrorText from './ErrorText'
import * as Yup from 'yup';

export default function Deposit(){
  const { activeUserX } = useContext(ActiveUserXContext);
  const [deposit, setDeposit] = React.useState('');
  let [depositUser, setDepositUser] = React.useState();
  let depositerClone = {...depositUser};

  useEffect(() => {
    async function fetchUser(){
      let email = activeUserX;
      await fetch(`http://localhost:8081/users/findUser/${email}`, {method: 'GET'})
      .then(response => response.json())
      .then(data => setDepositUser(data));
    }
    fetchUser();
  }, [depositUser]);

    function clearForm(){
      console.log("you cleared it");
    }
  
    function handleDeposit(values){
      let newBalance = parseInt(depositerClone.balance) + parseInt(values.deposit);
      updateUserBalance(newBalance);
      alert(`Congratulations! You deposited ${values.deposit}`);
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
      deposit: Yup.number()
      .min(1, 'Must be at least $1 deposit')
      .required('Deposit amount is required'),
    });  

return (
    <>
      {!activeUserX ? (
        <p>Please <a href="#/login/">Login</a> to access deposits</p> 
        ) : (
      <Card
          bgcolor="primary"
          txtcolor="white"
          header={`${depositerClone.name}'s current balance:  $${depositerClone.balance}`}
          title=""
          body={(
            <Formik
              initialValues = {{
                deposit: deposit
              }}
              validationSchema={validate}
              onSubmit={handleDeposit}
          >
            {formik => (
                <div>
                    <p>Enter an amount greater than $1 then click "Deposit Funds"</p>
                    <Form>
                        <Field
                            label="Deposit"
                            name="deposit"
                            type="number"
                            placeholder="Enter deposit amount"
                            className="form-control"
                            id="deposit"
                            autoComplete="off"
                        />
                        <ErrorMessage name="deposit" component={ErrorText} />
                        <br />
                        <button
                            type="submit"
                            className="btn btn-light"
                        >
                            Deposit Funds
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