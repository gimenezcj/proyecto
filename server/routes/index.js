// primeras rutas
const {Router} = require('express');

const router = Router();

router.get('/',(req,res)=>{
//	const {algo,algomas} = req.body;
  const rta={...req.body};
	res.json(rta);
});

module.exports = router;