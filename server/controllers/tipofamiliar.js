const controller={};

const generaRta=require('../modules/dbfunctions');
const TipoFamiliar=require('../models/tipofamiliar');

controller.listAll=(req,res)=>{
  return generaRta(req,res,TipoFamiliar.findAll());
}

module.exports=controller;