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

//Api del inicio de una actividad -> el id es la id de la actividad asociada a la rehabilitacions
router.post('/actividad/:idActividad/inicia',controller.iniciaActividad);

//Api respecto a los recorridos
router.post('/resultadoActividad/:idResultadoActividad/iniciaRecorrido', controller.iniciaRecorrido);
router.post('/resultadoRecorrido/:idResultadoRecorrido/chocaCasa',controller.chocaCasa);
router.post('/resultadoRecorrido/:idResultadoRecorrido/sinCombustible',controller.sinCombustible);
router.post('/resultadoRecorrido/:idResultadoRecorrido/completo',controller.completo);

//Api de las tareas de menor precio
router.post('/resultadoActividad/:idResultadoActividad/iniciaMenorPrecio',controller.iniciaMenorPrecio);  //bdoy: opcionCorrecta,listaItems
router.post('/menorPrecio/:idMenorPrecio/abandona',controller.menorPrecioAbandona);         
router.post('/menorPrecio/:idMenorPrecio/seleccion',controller.menorPrecioSeleccion);                     //body: idSelecciono
router.post('/menoePrecio/:idMenorPrecio/ayudaVisual',controller.menorPrecioAyudaVisual);
router.post('/menoePrecio/:idMenorPrecio/ayudaSonora',controller.menorPrecioAyudaSonora);


module.exports = router;