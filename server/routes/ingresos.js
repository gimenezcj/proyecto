const {Router} = require('express');
const Controller = require('./../controllers/ingreso');

const router = Router();

router.get('/list',Controller.listAll);

module.exports = router;