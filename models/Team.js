const
	mongoose = require('mongoose'),
	teamSchema = new mongoose.Schema({
        name: { type: String, required: true, unique: true },
	    logoUrl: { type: String }
		
    })
    const Team = mongoose.model('Team', teamSchema)
module.exports = Team