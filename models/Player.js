const
	mongoose = require('mongoose'),
	playerSchema = new mongoose.Schema({
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        height: { type: String },
        weight: { type: Number },
        imageUrl: { type: String }
    })
    const Player = mongoose.model('Player', playerSchema)
module.exports = Player