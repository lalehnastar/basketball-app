import React from 'react'
import httpClient from '../httpClient.js'
import { Link } from 'react-router-dom'

class Players extends React.Component {



    state = {
        players: []
    }
    componentDidMount() {
httpClient.getAllPlayers().then((serverResponse) => {
    
    this.setState({
        players: serverResponse.data
    })
})
    }


    render() {
     const { players } = this.state
      return (
        <div className="Players">   
         <h2>Number of Players: {players.length}</h2>
{players.map((p) => {
return(
    <Link key={p._id} to={`/players/${p._id}`}>
     <img src={p.imageUrl} alt="{p.firstName} {p.lastName}" />
     
     </Link>
)
})} 
        </div>
      )
    }
  }
  export default Players;
  