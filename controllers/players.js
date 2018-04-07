const Player = require('../models/Player.js')
const signToken = require('../serverAuth.js').signToken

module.exports = {
	// list all teams
	index: (req, res) => {
		Player.find({}, (err, players) => {
			res.json(players)
		})
	},

	// get one Team
	show: (req, res) => {
		console.log("Current Player:")
		console.log(req.player)
		Player.findById(req.params.id, (err, player) => {
			res.json(player)
		})
	},

	// create a new Team
	create: (req, res) => {
		Player.create(req.body, (err, player) => {
			if(err) return res.json({success: false, code: err.code})
			// once Team is created, generate a token to "log in":
			const token = signToken(player)
			res.json({success: true, message: "Player created. Token attached.", token})
		})
	},

	// update an existing Team
	update: (req, res) => {
		Player.findById(req.params.id, (err, player) => {
			Object.assign(player, req.body)
			Player.save((err, updatedPlayer) => {
				res.json({success: true, message: "Player updated.", player})
			})
		})
	},

	// delete an existing Team
	destroy: (req, res) => {
		Player.findByIdAndRemove(req.params.id, (err, player) => {
			res.json({success: true, message: "Player deleted.", player})
		})
	}



}