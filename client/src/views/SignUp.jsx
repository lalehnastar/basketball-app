import React from 'react'
import httpClient from '../httpClient'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

// sign up form behaves almost identically to log in form. We could create a flexible Form component to use for both actions, but for now we'll separate the two:
class SignUp extends React.Component {
	state = {
		fields: { name: '', email: '', password: ''}
	}

	onInputChange(evt) {
		this.setState({
			fields: {
				...this.state.fields,
				[evt.target.name]: evt.target.value
			}
		})
	}

	onFormSubmit(evt) {
		evt.preventDefault()
		httpClient.signUp(this.state.fields).then(user => {
			this.setState({ fields: { name: '', email: '', password: '' } })
			if(user) {
				this.props.onSignUpSuccess(user)
				this.props.history.push('/')
			}
		})
	} 

	onButtonClick(evt) {
		evt.preventDefault()
		httpClient.signUp(this.state.fields).then(user => {
			this.setState({ fields: { name: '', email: '', password: '' } })
			if (user) {
				this.props.onSignupSuccess(user)
				this.props.history.push('/')
			}
		})
	}
	
	render() {
		const { name, email, password } = this.state.fields
		return (
			<Form onChange={this.onInputChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)}>
			<FormGroup>
				<Label for="email">Name</Label>
				<Input type="name" name="name" value={name} id="name" placeholder="Enter an Name" onChange={this.onInputChange.bind(this)} />
			</FormGroup>
			<FormGroup>
				<Label for="email">Email</Label>
				<Input type="email" name="email" value={email} id="email" placeholder="Enter an Email" onChange={this.onInputChange.bind(this)} />
			</FormGroup>
			<FormGroup>
				<Label for="password">Password</Label>
				<Input type="password" name="password" value={password} id="password" placeholder="Enter a password" onChange={this.onInputChange.bind(this)} />
			</FormGroup>
			<Button>Submit</Button>
		</Form>
		)
	}
}

export default SignUp