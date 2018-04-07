const
	express = require('express'),
	teamsRouter = new express.Router(),
	teamsCtrl = require('../controllers/teams.js'),
	verifyToken = require('../serverAuth.js').verifyToken

teamsRouter.route('/')
	.get(teamsCtrl.index)
	.post(teamsCtrl.create)

teamsRouter.use(verifyToken)
teamsRouter.route('/:id')
	.get(teamsCtrl.show)
	.patch(teamsCtrl.update)
	.delete(teamsCtrl.destroy)

module.exports = teamsRouter