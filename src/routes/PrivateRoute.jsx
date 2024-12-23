import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component }) => {
  const user = useSelector((store)=> store.user);
  return (
    <div>
        <h1>Private Route</h1>
    </div>
  )
}

export default PrivateRoute