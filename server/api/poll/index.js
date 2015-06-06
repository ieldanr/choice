'use strict';

var express = require('express');
var controller = require('./poll.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/signature', auth.isAuthenticated(), controller.signature);
router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);
router.post('/:id/voteOption1', auth.isAuthenticated(), controller.voteOption1);
router.post('/:id/voteOption2', auth.isAuthenticated(), controller.voteOption2);
router.get('/mychoices/:user_id', auth.isAuthenticated(), controller.myChoices);

module.exports = router;
