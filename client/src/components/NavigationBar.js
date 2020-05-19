import React, { useState } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap'

const NavigationBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const addMargin = {
        marginBottom: '3rem'
    }

    return (
        <Navbar color="dark" dark expand="sm" style={addMargin}>
            <NavbarBrand href="/">Task Manager</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav navbar>
                    <NavItem>
                        <NavLink href="/create">Create</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/list">List</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/settings">Settings</NavLink>
                    </NavItem>
                </Nav>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink href="/signout">Signout</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    )
}

export default NavigationBar