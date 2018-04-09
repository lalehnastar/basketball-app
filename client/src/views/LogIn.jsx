import React from 'react'
import httpClient from '../httpClient'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class LogIn extends React.Component {
	state = {
		fields: { email: '', password: '' }
	}

	onInputChange(evt) {
		this.setState({

			fields: {
				...this.state.fields,
				[evt.target.name]: evt.target.value
			}
		})
	}

	onButtonClick(evt) {
		evt.preventDefault()
		httpClient.logIn(this.state.fields).then(user => {
			this.setState({ fields: { email: '', password: '' } })
			if (user) {
				this.props.onLoginSuccess(user)
				this.props.history.push('/')
			}
		})
	}

	render() {
		const { email, password } = this.state.fields
		return (
			<Form>
				<FormGroup>
					<Label for="email">Email</Label>
					<Input type="email" name="email" id="email" placeholder="Enter an Email" onChange={this.onInputChange.bind(this)} />
				</FormGroup>
				<FormGroup>
					<Label for="password">Password</Label>
					<Input type="password" name="password" id="password" placeholder="Enter password" onChange={this.onInputChange.bind(this)} />
				</FormGroup>
				<Button onClick={this.onButtonClick.bind(this)}>Submit</Button>
			</Form>
		)
	}
}

export default LogIn