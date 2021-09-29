import React from 'react'

export default function TableRow(props) {
    return (
            <tr>
                <td>{props.name}</td>
                <td>{props.email}</td>
                <td>{props.password}</td>
                <td>{"$" + props.balance}</td>
                <td>{props.role}</td>
            </tr>
    )
}
