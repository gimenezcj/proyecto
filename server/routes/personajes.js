const {Router} = require('express');
const Controller = require('../controllers/personajes');

const router = Router();

router.get('/list',Controller.listAll);

module.exports = router;