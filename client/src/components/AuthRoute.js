import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { loadUser } from '../actions/authActions'

import Login from '../components/Login'
import CreateUser from '../components/CreateUser'

const AuthRoute = (props) => {
    const { loadUser } = props
    useEffect(() => {
        loadUser()
    }, [loadUser])

    if (props.isLoading) {
        return null
    } else if (props.isAuthenticated) {
        return props.path === '/' ? (
            <Redirect to='/createTask' />
        ) : (
            <Route {...props} />
        )
    } else {
        if (props.path === '/') {
            return <Login />
        } else if (props.path === '/createUser') {
            return <CreateUser />
        } else {
            return <Login />
        }
    }
}

AuthRoute.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    loadUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    isLoading: state.auth.isLoading,
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { loadUser })(AuthRoute)
