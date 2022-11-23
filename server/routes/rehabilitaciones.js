const {Router} = require('express');
const controller = require('../controllers/rehabilitaciones');


const router = Router();

router.get('/list',controller.listAll);
router.get('/:id',controller.list);
router.get('/road/:id',controller.getRoadFromActivity);
router.get('/paciente/:pacienteId',controller.porPaciente);
router.delete('/:rehabilitacionId',controller.eliminar);
router.post('/guardar/nueva/:fonoaudiologoId/:pacienteId',controller.nueva);
router.post('/guardar/actualizar',controller.actualizar);
router.get('/pendientes/:pacienteId',controller.pendientesPorPaciente);


module.exports = router;