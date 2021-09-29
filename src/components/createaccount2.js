import React, { useContext } from 'react';
import { ErrorMessage, Field, Formik, Form } from 'formik';
import Card from './card';
import { UserContext } from '../index.js'
import * as Yup from 'yup';
//import TextField from './TextField';
import ErrorText from './ErrorText';
import '../App.css';

export default function CreateAccount(){
  const { value, setValue } = useContext(UserContext);
  const [show, setShow]                     = React.useState(true);
  const [name, setName]                     = React.useState('');
  const [email, setEmail]                   = React.useState('');
  const [password, setPassword]             = React.useState('');
  const [balance, setBalance] = React.useState('');
  const [role, setRole]                     = React.useState('');

  const validate = Yup.object({
    name: Yup.string()
    //.max(15, 'Must be 15 characters or less')
    .required('Name is required'),
    email: Yup.string()
    .email('Email is invalid')
    .required('Email is required'),
    password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
    role: Yup.string()
    .required('Role is required')
    .oneOf(['employee','customer']),
    balance: Yup.number()
    .required('Initial deposit must be at least $1')
    .min(1)
  });
  
  function clearForm(){
    setName('');
    setEmail('');
    setPassword('');
    setBalance('');
    setRole('');
    setShow(true);
  }

  function handleCreate(values){
    createUserMongo(values);
    setValue([...value, values]);
    setShow(false);
  }

  function createUserMongo(values){
    let name = values.name;
    let email = values.email;
    let password = values.password;
    let balance = values.balance;
    let role = values.role;
    console.log('starting create user');
    fetch(`http://localhost:8081/users/createUser/${name}/${email}/${password}/${balance}/${role}`, {method: 'POST'})
    .then(response => response.text())
    .then(data => {
      console.log(`You added new user ${data}`);
    })
  }

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      body={show ? (
          <Formik
            initialValues = {{
              name: name,
              email: email,
              password: password,
              balance: balance,
              role: role
            }}
            validationSchema={validate}
            onSubmit={handleCreate}
          >
            {formik => (
                <div>
                    <Form>
                        <Field
                            label="Name"
                            name="name"
                            type="text"
                            placeholder="Enter name"
                            className="form-control"
                            id="name"
                            autoComplete="off"
                        />
                        <ErrorMessage name="name" component={ErrorText} />
                        <Field
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="Enter email"
                            className="form-control"
                            id="email"
                            autoComplete="off"
                        />
                        <ErrorMessage name="email" component={ErrorText} />
                        <Field
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Enter password"
                            className="form-control"
                            id="password"
                            autoComplete="off"
                        />
                        <ErrorMessage name="password" component={ErrorText} />
                        <Field
                            label="Initial Deposit"
                            name="balance"
                            type="number"
                            placeholder="Initial deposit at least $1"
                            className="form-control"
                            id="balance"
                            autoComplete="off"
                        />
                        <ErrorMessage name="balance" component={ErrorText} />
                        <Field
                            as="select"
                            label="Role"
                            name="role"
                            type="text"
                            placeholder="select role"
                            className="form-control"
                            id="role"
                            autoComplete="off"
                        >
                          <option value="">Select a role</option>
                          <option value="customer">customer</option>
                          <option value="employee">employee</option>
                        </Field>
                        <ErrorMessage name="role" component={ErrorText} />
                        <br />
                        <button
                            type="submit"
                            className="btn btn-light"
                        >
                            Create Account
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
        ) : (
          <>
          <h5>Success!!!</h5>
          <form action="#/login/">
            <input 
              type="submit"
              className="btn btn-light"
              value="Log in" />
          </form>
          <p></p>
          <p>OR</p>
          <button
              type="submit"
              className="btn btn-light"
              onClick={clearForm}
            >
              Add Another Account
          </button>
          </>
        )}
    />
  )
}