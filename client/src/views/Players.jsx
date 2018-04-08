import React from 'react'
import httpClient from '../httpClient.js'
import { Link } from 'react-router-dom'
import Player from './Player'

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
                    return <Player _id={p._id} firstName={p.firstName} lastName={p.lastName}
                        imageUrl={p.imageUrl} />

                })}
            </div>
        )
    }
}
export default Players;
