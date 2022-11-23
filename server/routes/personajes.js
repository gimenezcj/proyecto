
const {Router} = require('express');
const controller = require('../controllers/personajes');
const controllerValija= require('../controllers/valijas');

const router = Router();

router.get('/list',controller.listAll);
router.post('/adquirir',controller.adquirir);
router.post('/adquirirValija',controllerValija.adquirir);
router.get('/:peronajeId', controller.personaje);

module.exports = router;