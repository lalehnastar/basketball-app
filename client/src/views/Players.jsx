import React from 'react'
import httpClient from '../httpClient.js'

import Player from './Player'
import _ from 'lodash'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';

class Players extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // flashMessage: null,
            players: [],
            
            player: {
                _id: "",
                firstName: "",
                lastName: "",
                weight: "",
                height: "",
                imageUrl: "",
               
            },
            newModalOpen: false,
            editModalOpen: false
        }

        this.toggleNewModal = this.toggleNewModal.bind(this);
        this.toggleEditModal = this.toggleEditModal.bind(this);
    }

    toggleNewModal() {
        this.setState({
            newModalOpen: !this.state.newModalOpen
        });
    }
    toggleEditModal() {
        this.setState({
            editModalOpen: !this.state.editModalOpen
        });
    }

  

    handleNewClick() {
        this.setState({
            newModalOpen: true
        })
    }



  
    handleNewFormSubmit(evt) {
        evt.preventDefault()
        const { firstName, lastName, weight, height, imageUrl } = this.refs
        const playerFormFields = {
           
            firstName: firstName.refs.firstName.value,
            lastName: lastName.refs.lastName.value,
            weight: weight.refs.weight.value,
            height: height.refs.height.value,
            imageUrl: imageUrl.refs.imageUrl.value,
        }

        httpClient.createPlayer(playerFormFields)
            .then((serverResponse) => {
                httpClient.getAllPlayers().then((serverPlayerResponse) => {
                    this.setState({
                        players: serverPlayerResponse.data,
                        newModalOpen: false
                    })
                })
            })
    }

   

    handleEditPlayerClick(player) {
        this.setState({
            editModalOpen: true,
        player: player
        })
    }

    handleDeletePlayerClick(player) {
        
        httpClient.deletePlayer(player._id)
            .then((serverResponse) => {  
                console.log(serverResponse.data)    
              this.setState({
                  players: this.state.players.filter((p) => {
                      return p._id !== player._id
                  })
              })
            })
    }




    handleEditPlayerFormSubmit(evt) {
        evt.preventDefault()
        
         const { firstName, lastName, weight, height, imageUrl } = this.refs
         const playerFormFields = {
   
            firstName: firstName.refs.firstName.value,
            lastName: lastName.refs.lastName.value,
           weight: weight.refs.weight.value,
            height: height.refs.height.value,
         imageUrl: imageUrl.refs.imageUrl.value,
      }
        httpClient.updatePlayer(this.state.player._id, playerFormFields)
       .then((serverResponse) => {
             const playerCopy = [...this.state.players]
           const index =  this.state.players.findIndex((p) => {
             return  p._id === serverResponse.data.player._id
           })
            playerCopy[index] = serverResponse.data.player
            this.setState({
              player: serverResponse.data.player,
                 players: playerCopy,
               players_details: [],
                 editModalOpen: false
          })
         })
    }
     componentDidMount() {
        httpClient.getAllPlayers().then((serverResponse) => {
            this.setState({
                players: serverResponse.data
            })
        })
    }

    render() {
   
        const playerRows = _.chunk(this.state.players, 4)
        return (
            <div className="Players">
                <h2>My Players</h2>
                <Button onClick={this.handleNewClick.bind(this)} color="secondary">Create New Player</Button>
                <Container>
                    {playerRows.map((row, index) => {
                        return (
                            <Row key={index}>
                                {row.map((p) => {
                                    return <Col sm="3" key={p._id}>
                                    <Button onClick={this.handleEditPlayerClick.bind(this, p)} color="success" size="sm">Edit</Button>
                                      <Button onClick={this.handleDeletePlayerClick.bind(this, p)} color="danger" size="sm">Delete</Button>

                                        <Player _id={p._id} firstName={p.firstName} lastName={p.lastName} weight={p.weight} height={p.height}
                                            imageUrl={p.imageUrl} />

                                    </Col>
                                })}
                            </Row>

                        )
                    })}
                </Container>




                
              
                <Modal isOpen={this.state.newModalOpen}>

                    <ModalHeader>Create New Player</ModalHeader>
                    <Form onSubmit={this.handleNewFormSubmit.bind(this)}>
                        <ModalBody>
                            <FormGroup>
                                <Label for="firstName">First Name</Label>
                                <Input ref="firstName" innerRef="firstName" type="text" id="firstName" />
                                <Label for="lastName">Last Name</Label>
                                <Input ref="lastName" innerRef="lastName" type="text" id="lastName" />
                                <Label for="height">Height</Label>
                                <Input ref="height" innerRef="height" type="text" id="height" />
                                <Label for="weight">Weight</Label>
                                <Input ref="weight" innerRef="weight" type="text" id="weight" />
                                <Label for="imageUrl">Image Url</Label>
                                <Input ref="imageUrl" innerRef="imageUrl" type="text" id="imageUrl" />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" color="primary">Create</Button>
                            <Button color="secondary" onClick={this.toggleNewModal}>Cancel</Button>
                        </ModalFooter>
                    </Form>
       
                </Modal>
             


 <Modal isOpen={this.state.editModalOpen}>

                    <ModalHeader>Edit Player</ModalHeader>
                    <Form onSubmit={this.handleEditPlayerFormSubmit.bind(this)}>
                        <ModalBody>
                            <FormGroup>
                                <Label for="firstName">First Name</Label>
                                <Input ref="firstName" innerRef="firstName" defaultValue={this.state.player.firstName}type="text" id="firstName" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="lastName">Last Name</Label>
                                <Input ref="lastName" innerRef="lastName" defaultValue={this.state.player.lastName} type="text" id="lastName" />
                            </FormGroup>
                            <FormGroup>
                            <Label for="height">Height</Label>
                                <Input ref="height" innerRef="height" defaultValue={this.state.player.height} type="text" id="height" />
                            </FormGroup>
                            <FormGroup>
                            <Label for="weight">Weight</Label>
                                <Input ref="weight" innerRef="weight" defaultValue={this.state.player.weight} type="text" id="weight" />
                            </FormGroup>
                            <FormGroup>
                            <Label for="imageUrl">Image Url</Label>
                                <Input ref="imageUrl" innerRef="imageUrl" defaultValue={this.state.player.imageUrl} type="text" id="imageUrl" />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" color="primary">Update</Button>
                            <Button color="secondary" onClick={this.toggleEditModal}>Cancel</Button>
                        </ModalFooter>
                    </Form>

                </Modal>


            </div>
        )
    }
}





export default Players;
