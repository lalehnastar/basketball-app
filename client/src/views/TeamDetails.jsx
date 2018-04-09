import React from 'react'
import httpClient from '../httpClient.js'
import { Link } from 'react-router-dom'
import Player from './Player'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';

class TeamDetails extends React.Component {
    state = {
        modalOpen: false,
        team: {
            _id: "",
            name: "",
            players: []
        },
        players: []
    }

    handleEditClick() {
        this.setState({
            modalOpen: true
        })
    }

    handleDeleteClick() {
        httpClient.deleteTeam(this.props.match.params.id)
            .then((serverTeamResponse) => {
                this.props.history.push('/teams')
            })
    }

    handleEditFormSubmit(evt) {
        evt.preventDefault()
        const { name, players } = this.refs
        const teamFormFields = {
            
            name: name.refs.name.value,
            players: players.refs.players.value
        }

        httpClient.updateTeam(this.state.team._id, teamFormFields)
            .then((serverResponse) => {
                
                this.setState({
                    team: serverResponse.data.team,
                    modalOpen: false
                })
            })
    }

    componentDidMount() {
        httpClient.getTeam(this.props.match.params.id)
            .then((serverTeamResponse) => {
                this.setState({
                    team: serverTeamResponse.data
                });
            })
            .then(() => {
                //List of Player Ids
                var player_ids = this.state.team.players || [];
                player_ids.map((p) => {
                    httpClient.getPlayer(p).then((serverPlayerResponse) => {

                        this.setState({
                            players: [...this.state.players, serverPlayerResponse.data]
                        });
                    });

                })
            })
    }

    render() {
        const { team, players, modalOpen } = this.state
        return (
            <div className="Teams">
                <Button onClick={this.handleEditClick.bind(this)} color="primary">Edit Team</Button>
                <Button onClick={this.handleDeleteClick.bind(this)} color="primary">Delete Team</Button>
                <h1>{team.name}</h1>
                {players.map((p) => {
                    return 
                })}

                <Modal isOpen={modalOpen}>
                    <ModalHeader>Edit Team</ModalHeader>
                    <Form onSubmit={this.handleEditFormSubmit.bind(this)}>
                        <ModalBody>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input defaultValue={team.name}  ref="name" innerRef="name" type="text" id="name" />
                            </FormGroup>
                          
                            <FormGroup>
                                <Label for="players">Players</Label>
                                <Input defaultValue={team.players}  ref="players" innerRef="players" type="text" id="players" />
                            </FormGroup>


                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" color="info">Update</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        )
    }
}
export default TeamDetails;
