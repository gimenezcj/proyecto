const controller={};

const generaRta=require('../modules/dbfunctions');
const Ingresos=require('../models/ingresos');

controller.listAll=(req,res)=>{
  return generaRta(req,res,Ingresos.findAll());
}

module.exports=controller;