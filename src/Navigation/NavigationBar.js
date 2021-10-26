import React, { useState } from 'react'
import { useHistory, NavLink as RRNavLink } from 'react-router-dom'
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

const NavigationBar = ({
  isAuthenticated,
  isLoading,
  token,
  logout,
  ...props
}) => {
  const history = useHistory()
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  const signOut = () => {
    logout()
    history.push(LOGIN_URL)
  }

  return isLoading ? null : (
    <Navbar color='success' dark expand='sm'>
      <NavbarBrand href={token ? HOME_URL : LOGIN_URL}>
        Task Manager
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        {token ? (
          <>
            <Nav navbar>
              <NavItem>
                <NavLink to={HOME_URL} tag={RRNavLink}>
                  Create
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to={TASKLIST_URL} tag={RRNavLink}>
                  List
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to={SETTINGS_URL} tag={RRNavLink}>
                  Settings
                </NavLink>
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
              <NavLink to={LOGIN_URL} tag={RRNavLink}>
                Login
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to={REGISTER_URL} tag={RRNavLink}>
                Register
              </NavLink>
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
  logout: state.auth.logout,
  token: state.auth.token
})

const mapDispatchToProps = {
  logout
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar)
