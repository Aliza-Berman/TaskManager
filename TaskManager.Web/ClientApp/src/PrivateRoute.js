import React from 'react';
import { UserContext } from './UserContext';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <UserContext.Consumer>
        {value => {
            const { user } = value;
            return <Route {...rest} render={(props) => (
                !!user ? <Component {...props} /> : <Redirect to='/login' />
            )} />
        }}
    </UserContext.Consumer>

)
