const {Router} = require('express');
const Controller = require('../controllers/decorativos');

const router = Router();

router.get('/list',Controller.listAll);
router.post('/listAny',Controller.listAny);

module.exports = router;