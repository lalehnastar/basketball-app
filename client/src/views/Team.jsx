import React from 'react'
import httpClient from '../httpClient.js'
import { Link } from 'react-router-dom'

class Teams extends React.Component {



    state = {
        teams: []
    }
    componentDidMount() {
httpClient.getAllTeams().then((serverResponse) => {
    
    this.setState({
        teams: serverResponse.data
    })
})
    }


    render() {
     const { teams } = this.state
      return (
        <div className="Teams">   
         <h2>Number of Teams: {teams.length}</h2>
{teams.map((t) => {
return(
    <Link key={t._id} to={`/teams/${t._id}`}>
     <img src={t.logoUrl} alt={t.name} />
     </Link>
)
})} 
        </div>
      )
    }
  }
  export default Teams;
  