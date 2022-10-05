const {Router} = require('express');
const Controller = require('../controllers/escenarios');

const router = Router();

router.get('/list',Controller.listAll);

module.exports = router;