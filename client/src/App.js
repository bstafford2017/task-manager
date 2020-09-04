import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadUser } from './Auth/authActions'
import AuthRoute from './Routes/AuthRoute'
import NavigationBar from './Navigation/NavigationBar'
import Login from './Auth/Login'
import Register from './Auth/Register'
import CreateTask from './Tasks/CreateTask'
import TaskList from './Tasks/TaskList'
import Settings from './Settings/Settings'
import NotFound from './Error/NotFound'
import {
  LOGIN_URL,
  REGISTER_URL,
  HOME_URL,
  TASKLIST_URL,
  SETTINGS_URL
} from './Routes'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { Spinner } from 'reactstrap'

const App = ({ isLoading, ...props }) => {
  const spinnerStyle = {
    display: 'block',
    position: 'fixed',
    zIndex: 1031,
    top: '45%',
    right: '50%',
    marginTop: '-..px',
    marginRight: '-..px',
    width: '5rem',
    height: '5rem'
  }

  useEffect(() => {
    loadUser()
  }, [])

  return (
    <Router>
      <ToastContainer />
      {isLoading ? (
        <Spinner color='success' size='lg' type='grow' style={spinnerStyle} />
      ) : null}
      <>
        <Route path={LOGIN_URL} component={NavigationBar} />
        <Switch>
          <Route exact path={LOGIN_URL} component={Login} />
          <Route path={REGISTER_URL} component={Register} />
          <AuthRoute path={HOME_URL} component={CreateTask} />
          <AuthRoute path={TASKLIST_URL} component={TaskList} />
          <AuthRoute path={SETTINGS_URL} component={Settings} />
          <AuthRoute component={NotFound} />
        </Switch>
      </>
    </Router>
  )
}

App.propTypes = {
  isLoading: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading
})

const mapDispatchToProps = {
  loadUser
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
