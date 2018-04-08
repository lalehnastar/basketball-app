import React from 'react'
import httpClient from '../httpClient.js'
import { Link } from 'react-router-dom'
import Player from './Player'

class TeamDetails extends React.Component {
    state = {
        team: {
            _id: "",
            name: "",
            logoUrl: "",
            players: []
        },
        players: []
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
                var player_ids = this.state.team.players;
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
        const { team, players } = this.state
        return (
            <div className="Teams">
                <h1>{team.name}</h1>
                {players.map((p) => {
                    return <Player _id={p._id} firstName={p.firstName} lastName={p.lastName}
                        imageUrl={p.imageUrl} />
                })}
            </div>
        )
    }
}
export default TeamDetails;
