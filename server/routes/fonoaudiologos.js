const {Router} = require('express');
const Controller = require('../controllers/fonoaudiologos');

const router = Router();

router.get('/list',Controller.listAll);
router.get('/:id/pacientes',Controller.listPacientes);
router.get('/resultado/:idActividad', Controller.resultadoRehabilitacion)
router.get('/resultado/:idActividad/recorridos', Controller.resultadoRecorridos)
router.get('/resultado/rehabilitacion/:idRehabilitacion', Controller.resultadoRehabilitacionResumen)

module.exports = router;