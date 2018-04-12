import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import httpClient from './httpClient'

import NavBar from './NavBar'
import LogIn from './views/LogIn'
import LogOut from './views/LogOut'
import SignUp from './views/SignUp'
import Teams from './views/Teams'
import TeamDetails from './views/TeamDetails'
import Players from './views/Players'
import Home from './views/Home'


class App extends React.Component {
	state = { currentUser: httpClient.getCurrentUser() }

	onLoginSuccess(user) {
		this.setState({ currentUser: httpClient.getCurrentUser() })
	}

	logOut() {
		httpClient.logOut()
		this.setState({ currentUser: null })
	}
	
	render() {
		const { currentUser } = this.state
		return (
			<div className='App container'>

			<NavBar currentUser={currentUser} />
		<div id="main">
				<Switch>

					<Route path="/login" render={(props) => {
						return <LogIn {...props} onLoginSuccess={this.onLoginSuccess.bind(this)} />
					}} />

					<Route path="/logout" render={(props) => {
						return <LogOut onLogOut={this.logOut.bind(this)} />
					}} />

					{/* the sign up component takes an 'onSignUpSuccess' prop which will perform the same thing as onLoginSuccess: set the state to contain the currentUser */}
					<Route path="/signup" render={(props) => {
						return <SignUp {...props} onSignUpSuccess={this.onLoginSuccess.bind(this)} />
					}} />



					<Route path="/teams/:id" component={TeamDetails} />

					<Route path="/teams" render={() => {
						return currentUser
							? <Teams />
							: <Redirect to="/login" />
					}} />
					


					<Route path="/players" render={() => {
						return currentUser
							? <Players />
							: <Redirect to="/login" />
					}} />

					<Route path="/" component={Home} />

				
				
				</Switch>
				</div>
		

			</div>
		)
		
		
	}
}

export default App