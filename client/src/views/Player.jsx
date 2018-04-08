import React from 'react'
import { Link } from 'react-router-dom'

export default class Player extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Link key={this.props._id} to={`/players/${this.props._id}`}>
        <img src={this.props.imageUrl} alt={this.props.firstName + " " + this.props.lastName}  />
      </Link>
    )
  };
}