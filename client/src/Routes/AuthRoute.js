import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { LOGIN_URL } from '.'
import hasToken from '../Utils'

const AuthRoute = ({ loadUser, isLoading, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoading ? null : hasToken() ? (
          <Component {...props} />
        ) : (
          <Redirect to={LOGIN_URL} />
        )
      }
    />
  )
}

AuthRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading
})

export default connect(mapStateToProps)(AuthRoute)
