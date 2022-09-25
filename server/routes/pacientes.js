const {Router} = require('express');
const Controller = require('../controllers/pacientes');

const router = Router();

router.get('/list',Controller.listAll);

module.exports = router;