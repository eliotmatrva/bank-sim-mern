import React from 'react';
import { UserContext } from '../index.js'
export default function Balance(){
    const ctx = React.useContext(UserContext);
    return (
      <h1>Balance<br />
      {JSON.stringify(ctx)}
    </h1>
    );  
  }