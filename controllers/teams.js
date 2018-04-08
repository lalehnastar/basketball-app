const Team = require('../models/Team.js')
const signToken = require('../serverAuth.js').signToken

module.exports = {
	// list all teams
	index: (req, res) => {
		Team.find({}, (err, teams) => {
			res.json(teams)
		})
	},

	// get one Team
	show: (req, res) => {
		console.log("Current Team:")
		console.log(req.team)
		Team.findById(req.params.id, (err, team) => {
			res.json(team)
		})
	},

	// create a new Team
	create: (req, res) => {
		Team.create(req.body, (err, team) => {
			if(err) return res.json({success: false, code: err.code})
			// once Team is created, generate a token to "log in":
			const token = signToken(team)
			res.json({success: true, message: "Team created. Token attached.", token})
		})
	},

	// update an existing Team
	update: (req, res) => {
		Team.findById(req.params.id, (err, team) => {
			Object.assign(team, req.body)
			team.save((err, updatedTeam) => {
				res.json({success: true, message: "Team updated.", team})
			})
		})
	},

	// delete an existing Team
	destroy: (req, res) => {
		Team.findByIdAndRemove(req.params.id, (err, team) => {
			res.json({success: true, message: "Team deleted.", team})
		})
	}

}