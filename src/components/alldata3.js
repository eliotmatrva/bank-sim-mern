import React, { useEffect, useContext } from 'react';
import Table from 'react-bootstrap/Table';
import TableRow from './TableRow';
import { ActiveUserXContext } from '../index.js'

export default function AllData(){
    const { activeUserX } = useContext(ActiveUserXContext);
    let [users, setUsers] = React.useState([])

    useEffect(() => {
        async function fetchUsers() {
            await fetch('http://localhost:8081/api/users', {method: 'GET'})
            .then(response => response.json())
            .then(data => setUsers(data));
        }
        fetchUsers();
    }, [users]);
    
return (
    !activeUserX ? (
        <p>Please <a href="#/login/">Login</a> to access all account data</p> 
        ) : (
        <>
        <h1>All Accounts</h1>
        <Table bordered hover>
            <thead>
                <tr className="tableHeader bg-primary text-white">
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Balance</th>
                <th>Role</th>
                </tr>
            </thead>
            <tbody>
                {users.map((element,i) => {
                    return(
                        <TableRow name={element.name} key={i} email={element.email} password={element.password} balance={element.balance} role={element.role} />
                    )}
                )}
            </tbody>
        </Table>
    </>
    )
  )
};