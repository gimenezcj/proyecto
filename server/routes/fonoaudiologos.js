const {Router} = require('express');
const Controller = require('../controllers/fonoaudiologos');

const router = Router();

router.get('/list',Controller.listAll);
router.get('/:id/pacientes',Controller.listPacientes);


module.exports = router;