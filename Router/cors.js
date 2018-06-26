function crosPermission(){
    this.permission=function(req,res,next){
      res.setHeader('Access-Control-Allow-Origin','*');
      res.setHeader('Access-Control-Allow-Headers','Content-Type','charset=UTF-8');
      res.setHeader('Access-Control-Allow-Methods','GET','POST','PUT','DELETE','OPTIONS');
      res.setHeader("Access-Control-Allow-Credentials", "true");
      next();
    }
  }
  
  module.exports= new crosPermission();