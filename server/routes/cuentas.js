const {Router} = require('express');
const Controller = require('../controllers/cuentas');

const router = Router();

router.get('/list',Controller.listAll);
router.post('/login',Controller.login);

module.exports = router;