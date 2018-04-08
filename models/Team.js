const
	mongoose = require('mongoose'),
	teamSchema = new mongoose.Schema({
        name: { type: String, required: true, unique: true },
	    logoUrl: { type: String },
		players:[ 
            { type: mongoose.Schema.Types.ObjectId, ref:"Player", unique: true }
        ]
    })
    const Team = mongoose.model('Team', teamSchema)
module.exports = Team