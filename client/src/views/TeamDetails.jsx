import React from 'react'
import httpClient from '../httpClient.js'

import Player from './Player'
import _ from 'lodash'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';


class TeamDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            team: {
                _id: "",
                name: "",
                players: []
            },
            players_details: [],
            allPlayers: [],
            selected_players:[]
        }

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modalOpen: !this.state.modalOpen
        });
    }

    handlePlayersChange(e) {
        var options = e.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
          if (options[i].selected) {
            value.push(options[i].value);
          }
        }
        this.setState({
            selected_players: value
        })
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
        
        const { name, logoUrl } = this.refs
        const teamFormFields = {

            name: name.refs.name.value,
            logoUrl: logoUrl.refs.logoUrl.value,
            players: this.state.selected_players
        }

        httpClient.updateTeam(this.state.team._id, teamFormFields)
            .then((serverResponse) => {

                this.setState({
                    team: serverResponse.data.team,
                    players_details: [],
                    modalOpen: false
                })
            })
            .then(() => {
                //List of Player Ids
                var player_ids = this.state.team.players || [];
                player_ids.map((p) => {
                    httpClient.getPlayer(p).then((serverPlayerResponse) => {
                        this.setState({
                           players_details : [...this.state.players_details, serverPlayerResponse.data]
                        })
                    });

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
                            players_details : [...this.state.players_details, serverPlayerResponse.data]
                        })
                    });

                })
            })
            .then(() => {
                httpClient.getAllPlayers().then((serverPlayerResponse) => {
                    this.setState({
                        allPlayers: serverPlayerResponse.data
                    });
                });
            })
    }

    render() {
        const { team, allPlayers, modalOpen } = this.state
        const playerRows = _.chunk(this.state.players_details, 4)
        return (
            <div className="Teams">
                <Button onClick={this.handleEditClick.bind(this)} color="success" size="sm">Edit Team</Button>
                
                <Button onClick={this.handleDeleteClick.bind(this)} color="danger" size="sm">Delete Team</Button>
     
                <img src={team.logoUrl} alt="" />
                <h1>{team.name}</h1>
                <Container>
                    {playerRows.map((row, index) => {
                        return (
                            <Row key={index}>
                                {row.map((p) => {
                                    return <Col sm="3" key={p._id}>
                                        <Player _id={p._id} firstName={p.firstName} lastName={p.lastName} weight={p.weight} height={p.height}
                                            imageUrl={p.imageUrl} />
                                    </Col>
                                })}
                            </Row>

                        )
                    })}
                </Container>


                <Modal isOpen={modalOpen}>
                    <ModalHeader>Edit Team</ModalHeader>
                    <Form onSubmit={this.handleEditFormSubmit.bind(this)}>
                        <ModalBody>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input defaultValue={team.name} ref="name" innerRef="name" type="text" id="name" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="logoUrl">Logo</Label>
                                <Input defaultValue={team.logoUrl} ref="logoUrl" innerRef="logoUrl" type="text" id="logoUrl" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="players">Select Multiple</Label>
                                <Input type="select" name="players" id="players" size="10" onChange={this.handlePlayersChange.bind(this)} multiple>
                                    {
                                        allPlayers.map((p) => {
                                            return <option value={p._id}>{p.firstName} {p.lastName}</option>
                                        })
                                    }
                                </Input>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" color="primary">Update</Button>
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        )
    }
}
export default TeamDetails;
