import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { LOGIN_URL } from '.'

const AuthRoute = ({
  loadUser,
  isLoading,
  token,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoading ? null : token ? (
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
  isLoading: state.auth.isLoading,
  token: state.auth.token
})

export default connect(mapStateToProps)(AuthRoute)
