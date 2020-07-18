import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { LOGIN_URL } from '.'
import { loadUser } from '../Auth/authActions'
import hasToken from '../Utils'

const AuthRoute = ({
  isAuthenticated,
  loadUser,
  component: Component,
  ...rest
}) => {
  useEffect(() => {
    loadUser()
  }, [loadUser])

  return (
    <Route
      {...rest}
      render={(props) =>
        hasToken() ? <Component {...props} /> : <Redirect to={LOGIN_URL} />
      }
    />
  )
}

AuthRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  loadUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = {
  loadUser
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthRoute)
