const {Router} = require('express');
const Controller = require('../controllers/personajes');

const router = Router();

router.get('/list',Controller.listAll);
router.post('/adquirir',Controller.adquirir);

module.exports = router;