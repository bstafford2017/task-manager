import React, { useState } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../Auth/authActions'

const NavigationBar = (props) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => setIsOpen(!isOpen)

    const logout = (e) => {
        props.logout()
    }

    const notLoggedIn = (
        <Nav navbar>
            <NavItem>
                <NavLink href='/'>Login</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href='/register'>Register</NavLink>
            </NavItem>
        </Nav>
    )

    const loggedIn = (
        <React.Fragment>
            <Nav navbar>
                <NavItem>
                    <NavLink href='/createTask'>Create</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href='/list'>List</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href='/settings'>Settings</NavLink>
                </NavItem>
            </Nav>
            <Nav className='ml-auto' navbar>
                <NavItem>
                    <NavLink href='#' onClick={logout}>
                        Log Out
                    </NavLink>
                </NavItem>
            </Nav>
        </React.Fragment>
    )

    let renderComponent = null
    if (props.isLoading) {
        renderComponent = null
    } else if (props.isAuthenticated) {
        renderComponent = loggedIn
    } else {
        renderComponent = notLoggedIn
    }

    return (
        <Navbar color='dark' dark expand='sm'>
            <NavbarBrand href={props.isAuthenticated ? '/createTask' : '/'}>
                Task Manager
            </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                {renderComponent}
            </Collapse>
        </Navbar>
    )
}

NavigationBar.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    isLoading: state.auth.isLoading,
    isAuthenticated: state.auth.isAuthenticated,
    logout: state.auth.logout,
})

export default connect(mapStateToProps, { logout })(NavigationBar)
