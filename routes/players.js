const
	express = require('express'),
	playersRouter = new express.Router(),
	playersCtrl = require('../controllers/players.js'),
	verifyToken = require('../serverAuth.js').verifyToken

playersRouter.route('/')
	.get(playersCtrl.index)
	.post(playersCtrl.create)

playersRouter.use(verifyToken)
playersRouter.route('/:id')
	.get(playersCtrl.show)
	.patch(playersCtrl.update)
	.delete(playersCtrl.destroy)

module.exports = playersRouter