import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Spinner } from 'reactstrap'
import AuthRoute from './Auth/AuthRoute'
import NavigationBar from './Navigation/NavigationBar'
import Login from './Auth/Login'
import Register from './Auth/Register'
import CreateTask from './Tasks/CreateTask'
import TaskList from './Tasks/TaskList'
import Settings from './Settings/Settings'
import NotFound from './Error/NotFound'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

const App = (props) => {
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

  return (
    <Router>
      <ToastContainer />
      {props.isLoading ? (
        <Spinner color='dark' size='lg' type='grow' style={spinnerStyle} />
      ) : (
        <NavigationBar />
      )}
      <Switch>
        <AuthRoute exact path='/' render={(props) => <Login />} />
        <AuthRoute exact path='/register' render={(props) => <Register />} />
        <AuthRoute
          exact
          path='/createTask'
          render={(props) => <CreateTask />}
        />
        <AuthRoute exact path='/list' render={(props) => <TaskList />} />
        <AuthRoute exact path='/settings' render={(props) => <Settings />} />
        <AuthRoute render={(props) => <NotFound />} />
      </Switch>
    </Router>
  )
}

App.propTypes = {
  isLoading: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading
})

export default connect(mapStateToProps)(App)
