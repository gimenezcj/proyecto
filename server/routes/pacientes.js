const {Router} = require('express');
const Controller = require('../controllers/pacientes');

const router = Router();

router.get('/list',Controller.listAll);
router.get('/:id',Controller.getOne);
router.post('/nuevo',Controller.guardar);
router.post('/guardar/:id', Controller.guardar);
router.delete('/:id', Controller.eliminar);

module.exports = router;