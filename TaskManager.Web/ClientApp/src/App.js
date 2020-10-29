import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { UserContextComponent } from './UserContext';
import { PrivateRoute } from './PrivateRoute';
import { Home } from './Pages/Home';
import { Signup } from './Pages/Signup';
import { Login } from './Pages/Login';
import { Logout } from './Pages/Logout';


import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <UserContextComponent>
            <Layout>
                <PrivateRoute exact path='/' component={Home} />
                <Route path='/signup' component={Signup} />
                <Route path='/login' component={Login} />
                <Route path='/logout' component={Logout} />
                </Layout>
                </UserContextComponent>
        );
    }
}
