import React from 'react'
import httpClient from '../httpClient.js'
import { Link } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';

class Teams extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            teams: []
        }

        this.toggle = this.toggle.bind(this);
    }



    handleNewClick() {
        this.setState({
            modalOpen: true
        })
    }

    handleNewFormSubmit(evt) {
        evt.preventDefault()
        const { name } = this.refs
        const teamFormFields = {
            name: name.refs.name.value,

        }

        httpClient.createTeam(teamFormFields)
            .then((serverResponse) => {
                httpClient.getAllTeams().then((serverResponse) => {
                    this.setState({
                        teams: serverResponse.data,
                        modalOpen: false
                    })
                })
            })
    }

    toggle() {
        this.setState({
            modalOpen: !this.state.modalOpen
        });
    }

    componentDidMount() {
        httpClient.getAllTeams().then((serverResponse) => {
            this.setState({
                teams: serverResponse.data
            })
        })
    }

    render() {
        const { teams, modalOpen } = this.state
        return (
            <div className="Teams">
                <Button onClick={this.handleNewClick.bind(this)} color="primary">Create New Team</Button>
                <h2>Number of Teams: {teams.length}</h2>
                {
                    teams.map((t) => {
                    return (
                        <Link key={t._id} to={`/teams/${t._id}`}>
                            <li> {t.name}</li>
                        </Link>
                    )
                })}

                <Modal isOpen={modalOpen}>
                    <ModalHeader>Create New Team</ModalHeader>
                    <Form onSubmit={this.handleNewFormSubmit.bind(this)}>
                        <ModalBody>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input ref="name" innerRef="name" type="text" id="name" />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" color="primary">Create</Button>
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        )
    }
}
export default Teams;
