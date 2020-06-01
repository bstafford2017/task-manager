import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import AuthRoute from './components/AuthRoute'
import NavigationBar from './components/NavigationBar'
import Login from './components/Login'
import CreateUser from './components/CreateUser'
import CreateTask from './components/CreateTask'
import TaskList from './components/TaskList'
import Settings from './components/Settings'
import NotFound from './components/NotFound'

const App = (props) => {
    return (
        <Router>
            <NavigationBar />
            <Switch>
                <AuthRoute exact path='/' render={(props) => <Login />} />
                <AuthRoute
                    exact
                    path='/createUser'
                    render={(props) => <CreateUser />}
                />
                <AuthRoute
                    exact
                    path='/createTask'
                    render={(props) => <CreateTask />}
                />
                <AuthRoute
                    exact
                    path='/list'
                    render={(props) => <TaskList />}
                />
                <AuthRoute
                    exact
                    path='/settings'
                    render={(props) => <Settings />}
                />
                <AuthRoute render={(props) => <NotFound />} />
            </Switch>
        </Router>
    )
}

export default App
