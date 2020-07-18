import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../Auth/authActions'
import {
  LOGIN_URL,
  REGISTER_URL,
  HOME_URL,
  TASKLIST_URL,
  SETTINGS_URL
} from '../Routes'
import hasToken from '../Utils'

const NavigationBar = ({ isAuthenticated, isLoading, logout, ...props }) => {
  const history = useHistory()
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  const signOut = () => {
    logout()
    history.push(LOGIN_URL)
  }

  return isLoading ? null : (
    <Navbar color='dark' dark expand='sm'>
      <NavbarBrand href={hasToken() ? HOME_URL : LOGIN_URL}>
        Task Manager
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        {hasToken() ? (
          <>
            <Nav navbar>
              <NavItem>
                <NavLink href={HOME_URL}>Create</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href={TASKLIST_URL}>List</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href={SETTINGS_URL}>Settings</NavLink>
              </NavItem>
            </Nav>
            <Nav className='ml-auto' navbar>
              <NavItem>
                <NavLink href='#' onClick={signOut}>
                  Log Out
                </NavLink>
              </NavItem>
            </Nav>
          </>
        ) : (
          <Nav navbar>
            <NavItem>
              <NavLink href={LOGIN_URL}>Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={REGISTER_URL}>Register</NavLink>
            </NavItem>
          </Nav>
        )}
      </Collapse>
    </Navbar>
  )
}

NavigationBar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
  logout: state.auth.logout
})

const mapDispatchToProps = {
  logout
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar)
