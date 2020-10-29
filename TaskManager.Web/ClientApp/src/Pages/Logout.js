import React from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';
import { Redirect } from 'react-router-dom';

export class Logout extends React.Component {
    componentDidMount = async () => {
        await axios.get('/api/account/logout');
    }

    render() {
        return <UserContext.Consumer>
            {value => {
                value.logout();
                return <Redirect to='/login' />
            }}
        </UserContext.Consumer>
    }

}

