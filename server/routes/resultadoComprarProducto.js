const {Router} = require('express');
const controller = require('../controllers/resultadoComprarProducto');

const router = Router();

router.post('/',controller.agregar);
router.post('/prueba',controller.prueba)
module.exports = router;