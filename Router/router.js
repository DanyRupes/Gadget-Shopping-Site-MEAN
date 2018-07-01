var express = require('express')
var app = express()
var bodyparser = require('body-parser')
var path = require('path')
var monGo = require('../DataBase/MongoDb.js')
var multer = require('multer');
const paypal = require('paypal-rest-sdk');
var cors = require('cors')
app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
var itemTotal;
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
  });
paypal.configure({
    'mode': 'sandbox',
    'client_id' : 'ARNgCGTwpdIemZOIVgnAWMpE2qeIAdS0jROx6ZmNel1P8sEQ3RU0h3rulB7jWT8F3kc8VjsNpL6xIm77',
    'client_secret' : 'EHaHmNHUc1Lr7jdOg89IfMDHkh9qLbcKsfc1FyL74AMXbeAaiqloeypM_ZFa_mmxcVHN_LYaKzAlfrvM',
})

app.use(express.static(path.join(__dirname, "../client/")))
app.use(express.static(path.join(__dirname, '/../uploads/images/')))
app.use(express.static(path.join(__dirname, '/../Styles/Angular/')))
app.use(express.static(path.join(__dirname, '/../Styles/Bootstrap/')))
app.use(express.static(path.join(__dirname, '/../Styles/Jquery/')))
app.use(express.static(path.join(__dirname, '/../Styles/Fonts/')))
app.use(express.static(path.join(__dirname, '/../Styles/Images/')))
app.use(express.static(path.join(__dirname, "/../client/ng-file-upload-bower-10.1.8/")))

var storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null, 'uploads/images')
    },
    filename : (req, file, cb) => {
        cb(null, file.originalname)
    }
})
var upload = multer({storage : storage})

    app.post('/add_item',upload.single('image'),function(req,res){
        console.log("hrlloooo" +req.file.originalname)
        new monGo.item_list({id: req.body.id,
                name:req.body.name,
                model:req.body.model,
                type:req.body.type,
                description:req.body.description,
                image : {data : req.file.originalname,
                contentType : 'image/jpg'},
                price:req.body.price,
                stock:req.body.stock,
                emi:req.body.emi,
                offer:req.body.offer,
                warranty:req.body.warranty,
        }).save()
    .then(function () {res.send("Added Successfully")}) 

})
  

app.get('/load_item', function (req,res) { 
    monGo.item_list.find(function(err, items){
        if(err){console.log("///Errrorrr" + err)}
        else{
            res.json(items)
        }
    })   
 })

app.post('/load_profile', function (req, res) { 
    monGo.userProfile.findOne({email : req.body.email},function (err, profile) { 
        if(err){console.log(err)}
        // console.log(profile)
    res.json(profile)
     })
 })
app.post('/login', function (req, res) { 
    monGo.userProfile.findOne({email : req.body.email},function (err, result) {
        if(err) {console.log("ErrrR" +err)}
        else {
            try{
                if (result.password == req.body.password){
                    res.json(result ={
                        email : result.email,
                        name : result.name,
                        cart : result.cart
                    })
                }
                else{ 
                    console.log("password incorrect..//")
                    return res.status(908).send(new Error("IncorrectPassword"))
                }
            }
            catch(NoPass){
                return res.status(909).send(new Error('No_Matching_Emails'))
            }


        }
     })
 })

app.post('/addtoMyCart', function(req, res){
   monGo.userProfile.updateOne({email : req.body.email},{$addToSet:{cart : req.body.item}}, function (err, out) { 
       if(err){console.log("err : "+err)}
       console.log(out)
       res.send("success")
    })
})
app.post('/register', function (req, res) {
    monGo.userProfile.findOne({email : req.body.email},function (err, data) { 
        console.log("data is " +data)
        if(data == null){
            console.log("creating new account..")
                new monGo.userProfile({name : req.body.name, email:req.body.email, password: req.body.password}).save()
                .then(function(){
                    res.send(req.body.name) 
                }).catch((err)=>{console.log(err)})          
        }
        else {
            // console.log("Already account present is detected..")
           return res.status(999).send(new Error ('message : Account already present ..!'))
        }
     }) 
 })
 app.post('/payNow',function (req, res) {
    const create_payment_json = {
      "intent": "sale",
      "payer": {
          "payment_method": "paypal"
      },
      "redirect_urls": {
          "return_url": "http://gadget.code-your-road.tk/success",
          "cancel_url": "http://gadget.code-your-road.tk/cancel"
      },
      "transactions": [{
          "item_list": {
              "items": [{
                "name": req.body.item_name,
                "quantity": "1",
                "price": req.body.item_price,
                // "tax": "0.01",
                "sku": "1",
                "currency": "INR"
              }]
          },
          "amount": {
              "currency": "INR",
              "total": req.body.item_price,
          },
          "description":  req.body.item_desc,
      }]
  };
 
  itemTotal = req.body.item_price;
  paypal.payment.create(create_payment_json, function (err, payment) {
    if(err){
        console.log('check create Error')
        console.log(err)
    }
    else{ 
        for(var i=0;i<payment.links.length;i++){
            if(payment.links[i].rel === 'approval_url'){
                url = payment.links[i].href.replace(/%20/g, "");
                // console.log(url)
                res.send(url)
              }
        }
    }
  })
})

app.get('/success', function(req, res){
    console.log('check success1' +itemTotal)
    const payerId = req.query.PayerID;
    const paymentId  = req.query.paymentId;
    console.log(payerId, paymentId)
    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "INR",
                "total": itemTotal,
            }
        }]
      };

    paypal.payment.execute(paymentId, execute_payment_json, function (err, payment) { 

        if(err){
            console.log(err.response);            
        }
        else { 
            console.log(payment)
            res.redirect('#/contactSuccess')
        }
        // res.redirect('/#/profile')
     })

})
 

    app.get('/cancel', function (req, res) {
        res.send('cancelled')
    })
//  })

app.post('/removeCart',function (req, res) { 
    monGo.userProfile.update({name: req.body.user_name},{$pull: {cart: {_id : req.body.itemId}}},function (err, result) { 
        if(err) {console.log(err)}
        res.send("fine")
     })
 })


 app.post('/contactmsg',function (req, res) { 
     console.log(req.body.name,req.body.email,req.body.subject,req.body.msg)
     res.redirect('http://localhost:9000/#/contactSuccess')
  })
 module.exports = app
// var LocalStorage = require('node-localstorage').LocalStorage;
// localStorage = LocalStorage('./');

// var fs = require('fs');
// var assert = require('assert');
// var request = require('request')
// var request = require('request');
// var cors=require('./cors.js');
// localStorage.clear();

// if (typeof LocalStorage.localStorage !== "undefined" || LocalStorage.localStorage != null) {
//     LocalStorage.localStorage.clear();
//     // var LocalStorage = require('node-localstorage').LocalStorage;
//     // localStorage = new LocalStorage('./scratch');
//   }
// window.localStorage.setItem('Name' , 'Subu')
// sessionStorage.setItem("Name", "Aravind")
  
//   console.log(localStorage.getItem('Name'));
// res.setHeader('ETag', etag(body))
// var etag = require('etag')
// app.use(function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
//     next();
//   });
// var upload = multer({storage : storage}).single('file')

    // headers :{
    //     'Access-Control-Allow-Origin': 'http://localhost:8080',
    //     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
    //     'X-Requested-With': 'XMLHttpRequest',
    //     'Access-Control-Allow-Credentials': 'true',
    // }
// app.post('/fileUpload', upload.single('image'),function (req, res, next) {  
//     new monGo.item_list({'imagepath': 'uploads/images/'+req.file.filename}).save()
//         res.send({'message' : 'Successs'})

// })
    // res.header('Access-Control-Allow-Origin','*') 
    // res.header('Access-Control-Allow-Credentials','true')
    // itemPayPrice = req.body.item_price; 
    // console.log(req.body.item_price +""+ req.body.item_name +"" +req.body.item_model)
    // console.log(req.body.item_name,req.body.item_price,req.body.item_desc)
    // console.log(req.body)
// app.use(etag(body))
// app.enable('etag')
// app.use(cors.permission)
// var itemPayPrice;
// app.options('*',cors())
// app.use(cors({
//     "origin": "*",
//     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//     "preflightContinue": true,
//     "optionsSuccessStatus": 204
//   }))
// app.use(cors())
// app.options('*',cors())

// app.all('/*',function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
//     console.log(res)
//     console.log("Heeeeeeeeeeeeeeeeeeeeeellllllllllllooooooooo" +req.headers.origin)
//     console.log(req)

// // Request methods you wish to allow
// res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');

// // Request headers you wish to allow
// res.setHeader('Access-Control-Allow-Headers', '"Origin, X-Requested-With, Content-Type, Accept');

// // Set to true if you need the website to include cookies in the requests sent
// // to the API (e.g. in case you use sessions)
// res.setHeader('Access-Control-Allow-Credentials', true);

// // Pass to next layer of middleware
// next();

//   });
// // app.use(express.cookieParser());
// // app.use(express.methodOverride());
// app.use(function (req, res, next) { 
//         res.header('Access-Control-Allow-Origin','*');
//         res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
//         res.header('Access-Control-Allow-Headers','Content-Type');
//         next();
// })
// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'https://www.sandbox.paypal.com');
    // app.get('/temp',function (req, res) { 
//     console.log('hii')
//     res.set("Access-Control-Allow-Origin", "*")
//  })

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });
// var whitelist = ['http://example1.com', 'http://example2.com']
// var corsOptionsDelegate = function (req, callback) {
//   var corsOptions;
//   if (whitelist.indexOf(req.header('Origin')) !== -1) {
//     corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
//   }else{
//     corsOptions = { origin: false } // disable CORS for this request
//   }
//   callback(null, corsOptions) // callback expects two parameters: error and options
// }

// exports.handler() = (event, context, callback) => {
//     callback(null,{
//         statusCode : 200,
//         headers : {
//             "Access-Control-Allow-Origin" : "*"
//         }
//     })
// }
 // res.setHeader("Content-Type", "text/html")
                // res.setHeader('Access-Control-Allow-Origin','https://www.sandbox.paypal.com/')
                // res.setHeader('Access-Control-Allow-Origin','http://localhost:8080')
                // res.status(301).redirect('https://www.sandbox.paypal.com/in/home')
              
                // res.render(url,{title : 'CheckOut'})
                // console.log(res)

                // var options = {
                //     url: url,
                //     // method : 'REDIRECT',
                //     followAllRedirects: true,
                //     headers: {
                //     //   'User-Agent': 'request',
                //       'Access-Control-Allow-Origin':'https://www.sandbox.paypal.com/',
                //     }
                //   };
                // function callback(error, response, body) {
                // if (!error && response.statusCode == 200) {
                //     // var info = JSON.parse(body);
                //     //  console.log(response) 
                //     //  console.log(body) 
                //     // console.log(info.stargazers_count + " Stars");
                //     // console.log(info.forks_count + " Forks");
                // }
                // else { 
                //     console.log("Error" +Error)
                // }
                // }

                // request(options, callback)

                // request(url, {
                //     json : true
                // })
                // console.log(res)
                // console.log(payment)
                //res.setHeader('ETag', etag(body))
                // res.setHeader("Access-Control-Allow-Origin", "*")
                
                //  function redirect_(req, res) { 
                //     res.setHeader("Access-Control-Allow-Origin", "*")                     
                //     res.redirect("https://google.com");
                //   }
                // app.use(function(req, res, next) {
                //     res.setHeader('Access-Control-Allow-Origin', '*');
                //     res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
                //     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
                //     next();
                //   });
                // payment.links[i].href
                // var headers = {
                //     'Access-Control-Allow-Origin' : '*',
                //     'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
                //     'Content-Type': 'application/json',
                //     'Accept': 'application/json',
                //     'Access-Control-Allow-Credentials':'true',
                //     'xsrfWhitelistedOrigins' : ['https://www.sandbox.paypal.com/'],
                // };
                // res.redirect({
                //     url : payment.links[i].href,
                //     headers : headers
                // });
                // res.redirect = function redirect(Rreq, SRes) {
                //     console.log("reqq" +Rreq)
                //     console.log("ress" +SRes)
                //     // SRes.headers('Access-Control-Allow-Origin',"*")
                //     // console.log(SRes)
                //     var address = url;
                //     var body;
                //     var status = 302;
                // //   res.setHeader('Access-Control-Allow-Origin',"*")
                //     // allow status / url
                //     if (arguments.length === 2) {
                //       if (typeof arguments[0] === 'number') {
                //         console.log(arguments)                          
                //         status = arguments[0];
                //         address = arguments[1];
                //       } else {
                //           console.log('here')
                //         deprecate('res.redirect(url, status): Use res.redirect(status, url) instead');
                //         status = arguments[1];
                //       }
                //     }
                //     // Set location header
                //     this.location(address);
                //     address = this.get('Location');
                    
                //     console.log(encodeURI(address))
                //     // Support text/{plain,html} by default
                //     // this.format({
                //     //   text: function(){
                //     //     body = status + '. Redirecting to ' + encodeURI(address);
                //     //   },
                  
                //     //   html: function(){
                //     //       console.log(address)
                //     //     var u = escapeHtml(address);
                //     //     body = '<p>' + statusCodes[status] + '. Redirecting to <a href="' + u + '">' + u + '</a></p>';
                //     //   },
                  
                //     //   default: function(){
                //     //     body = '';
                //     //   }
                //     // });
                  
                //     // Respond
                //     this.statusCode = status;
                //     // this.set('Content-Length', Buffer.byteLength(body));
                //     if (this.req.method === 'HEAD') {
                //       this.end();
                //     } else {
                //   console.log("hloo")                        
                //       this.end(body);
                //     }
                //   };
                // res.send('fine')
                // res.location('https://google.com');
                // res.redirect(res.location('Access-Control-Allow-Origin','*'),'https://google.com' )
                // url = 'https://google.com';
                // res.location = function location(url) {
                //     var loc = url;
                  
                //     // "back" is an alias for the referrer
                //     if (url === 'back') {
                //       loc = this.req.get('Referrer') || '/';
                //     }
                //   this.set('Access-Control-Allow-Origin','*')
                //     // set location
                //     this.set('Location', loc);
                //     console.log(this)
                //     return this;
                //     // this.end(loc)
                //   };
                // res.location('http://flatuicolors.com/');
                // res.setHeader('Access-Control-Allow-Origin','*')
                // res.set('Content-Type','application/x-www-form-urlencoded')
                // res.set('Content-Type','application/x-www-form-urlencoded')
                // res.redirect(308,payment.links[i].href)
                // res.send
                // console.log(res)
                // res.setHeader('Access-Control-Allow-Origin','*')
                // res.redirect('http://flatuicolors.com/', 307)
                
                // console.log(JSON.stringify(res))
                // res.header('Access-Control-Allow-Origin','*')                 
                // console.log('ONe :' +payment.links[i])
                // res.setHeader("Access-Control-Allow-Origin", "*")
                // console.log(req.headers)
                
                // console.log('Two ' +res)
                // res.setHeader(req.headers.origin)
                // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
                // res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
                // res.setHeader('Access-Control-Allow-Credentials', true);
                // console.log(payment.links[i].href.split('.com/')[1])
                // res.header("Access-Control-Allow-Origin", "*");
                // res.header("Access-Control-Allow-Headers", "X-Requested-With");
                // res.header('Access-Control-Allow-Headers', 'Content-Type');
                // console.log(payment.links[i].href)
                // console.log(res)
                // console.log(res.header())
                // res.redirect(payment.links[i].href);

                // var xhr = new XMLHttpRequest();
                // xhr.open(method, payment.links[i].href, true)
                // console.log(xhr)
            
                // break;

    // console.log('FIRST TEST: ' + JSON.stringify(req.file));
    // console.log('second TEST: ' +req.file);
    

    // // var newFile = '../uploads/hplaptop.jpg' 
    // // console.log("new File" +newFile.filename)
    // fs.rename(req.file.path, file, function (err) { 
    //     if(err){console.log(err)
    //     res.send(500)}
    //     else {
    //         res.json({
    //             message : 'File uplodaded Success',
    //             filename : req.file.filename,
    //         });
    //     }
    //  })

 //Image upload for All Items
// app.post('/post_pic', function (req, res) { 
// upload(req, res, function (err) { 
//     if(err){console.log(err)}
//     else{
//         console.log(req.filename)
//         res.send("Succcessss")}
//  })

//     // var newMonGo = new monGo();
//     // newMonGo.item_list.img.data = fs.readFileSync(req.files.hplaptop.jpg) 
//     // newMonGo.item_list.img.contentType = 'image/png';
//     // newMonGo.save();
//  })


 // console.log(path.join(__dirname, "../client/"))
// app.use(function(req, res, next) { //allow cross origin requests
//     res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
//     res.header("Access-Control-Allow-Origin", "http://localhost");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
// var storage = multer.diskStorage({
//     dest : function (req, res, cb) { 
//         cb(null, '../uploads')
//      },
//      filename : function (req, file, cb) { 
//          cb(null, file.fieldname + '-' + Date.now() + '.jpg')
//       }
// })

