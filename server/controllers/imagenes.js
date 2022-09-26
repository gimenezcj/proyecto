const controller={};

const generaRta=require('../modules/dbfunctions');
const Imagenes=require('../models/imagenes');

controller.listAll=(req,res)=>{
  return generaRta(req,res,Imagenes.findAll());
}

module.exports=controller;