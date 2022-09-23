const {Router} = require('express');
const Controller = require('./../controller/UsersController');

const router = Router();

router.get('/list',Controller.listAll);

module.exports = router;