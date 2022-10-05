const {Router} = require('express');
const Controller = require('../controllers/rehabilitaciones');

const router = Router();

router.get('/list',Controller.listAll);
router.get('/:id',Controller.list);
router.get('/road/:id',Controller.getRoadFromActivity);

module.exports = router;