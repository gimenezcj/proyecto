const {Router} = require('express');
const Controller = require('../controllers/imagenes');

const router = Router();

router.get('/list',Controller.listAll);

module.exports = router;