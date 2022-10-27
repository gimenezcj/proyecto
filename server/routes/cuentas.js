const {Router} = require('express');
const Controller = require('../controllers/cuentas');

const router = Router();

router.get('/list',Controller.listAll);
router.post('/login',Controller.login);
router.post('/logout',Controller.logout)
router.get('/verificar/:nombreUsuario',Controller.verificar);

module.exports = router;