
const controller={};

const Users=require('../model/Users');

generaRta=async(req,res,comando)=>{
  try {
    const response=await comando
    .then((data)=>{
      const res={success:true,message: 'carga exitosa', data:data}
      return res;})
    .catch(error=>{
      const res={success:false,error:error}
      return res;});
    return res.json(response);
  } catch (e) {
    console.log('Error controller');
    console.log(e);
  }
}
controller.listAll=(req,res)=>{
  return generaRta(req,res,Users.findAll());
}

module.exports=controller;