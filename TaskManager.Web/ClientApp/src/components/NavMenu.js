import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { UserContext } from '../UserContext';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <UserContext.Consumer>
                {value => {
                    const { user } = value;
                    const isLoggedIn = !!user;
                    return (<header>
                        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                            <Container>
                                <NavbarBrand tag={Link} to="/">TaskManager</NavbarBrand>
                                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                                    <ul className="navbar-nav flex-grow">
                                        {!!isLoggedIn && <NavItem>
                                            <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                                        </NavItem>}
                                        {!isLoggedIn && <NavItem>
                                            <NavLink tag={Link} className="text-dark" to="/signup">SignUp</NavLink>
                                        </NavItem>}
                                        {!isLoggedIn && <NavItem>
                                            <NavLink tag={Link} className="text-dark" to="/login">Login</NavLink>
                                        </NavItem>}
                                        {!!isLoggedIn && <NavItem>
                                            <NavLink tag={Link} className="text-dark" to="/logout">Logout</NavLink>
                                        </NavItem>}
                                    </ul>
                                </Collapse>
                            </Container>
                        </Navbar>
                    </header>
                    )
                }}
            </UserContext.Consumer>
        );
    }
}
