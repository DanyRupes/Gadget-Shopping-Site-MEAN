var mongoose = require('mongoose')
// mongoose.connect("mongodb://localhost:27017/shop")
// url = 'mongodb://localhost:27017/shop'
 url = 'mongodb://danyrupes:danyrupes007@ds119171.mlab.com:19171/gadget-shop'
mongoose.connect(url);


mongoose.connection.on('connected', function(){
    console.log("mongodb Connection is open at " +url)
})
mongoose.connection.on('error', function(err){
    console.log("mongodb Connection error " +err)
})

 var Schema = mongoose.Schema;
 var user_profile = new Schema({
     name : String,
     email : String,
     password : String,
     cart : Array,
     userpic : String
    //  _id : String,
 })
 var item_list = new Schema ({
     id : Number,
     type : String,
     name: String,
     model:String,
     image :{
         data : String,

     },
     description: String,
     price: Number,
     stock: String,
     warranty:String,
     offer:String,
     emi:String,
 })

 var addReqShop =new Schema({
     sId : String,
    sName : String,
    sMail : String,
    sOwner : String,
    sPhone : Number,
    sLice : String,
    sCity  :String,  

 }) 

 var userProfile = mongoose.model("user_profile",user_profile)
 var item_list = mongoose.model("item_list", item_list)
 var addReqShop = mongoose.model("addReqShop", addReqShop);
 module.exports = {userProfile:userProfile,item_list:item_list,addReqShop : addReqShop}