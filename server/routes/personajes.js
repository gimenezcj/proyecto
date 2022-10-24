
const {Router} = require('express');
const Controller = require('../controllers/personajes');
const controllerValija= require('../controllers/valijas');

const router = Router();

router.get('/list',Controller.listAll);
router.post('/adquirir',Controller.adquirir);
router.post('/adquirirValija',controllerValija.adquirir);

module.exports = router;