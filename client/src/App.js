import React from 'react'
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

import NavigationBar from './components/NavigationBar'
import Login from './components/Login'
import Create from './components/Create'
import TaskList from './components/TaskList'
import Settings from './components/Settings'

const App = () => {
  	return (
		<Provider store={store}>
			<Router>
				<Switch>
					<Route exact path="/" render={ props => (
						<Login />
					)}/>
					<Route exact path="/create" render={ props => (
						<React.Fragment>
							<NavigationBar />
							<Create />
						</React.Fragment>
					)}/>
					<Route exact path="/list" render={ props => (
						<React.Fragment>
							<NavigationBar />
							<TaskList />
						</React.Fragment>
					)}/>
					<Route exact path="/settings" render={ props => (
						<React.Fragment>
							<NavigationBar />
							<Settings />
						</React.Fragment>
					)}/>
				</Switch>
			</Router>
		</Provider>
  	)
}

export default App