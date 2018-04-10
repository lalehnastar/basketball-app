import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

export default class Player extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const FullName = this.props.firstName + " " + this.props.lastName;

    return (  
      <Card>
        <CardImg top className="player-card-image"src={this.props.imageUrl} alt={FullName} />
        <CardBody>
          <CardTitle className="player-card-text">{FullName}</CardTitle>
          <CardText className="player-card-text">Weight: {this.props.weight}, Height: {this.props.height}</CardText>
        </CardBody>
      </Card>
    )
  };
}