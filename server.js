var express = require('express')
var app = express()
var router = require('./Router/router.js')
app.use('/', router)





app.listen(8080)
console.log('Running on http://localhost:8080')


// var http = require('http');
// var url = require('url');
// // var bodyparser = require('body-parser')
// // var path = require('path')
// // var connect = require ('connect')
// // var http = require('http')
// var request = require('request');
// // var cors_proxy = require('cors-anywhere');
// // app.use(bodyparser.json())
// // app.use(bodyparser.urlencoded({extended:false}))
// // var etag = require('etag')

// // var cors = require('cors')
// // app.use(cors())
// // var bodyparser = require('body-parser')
// // app.use(bodyparser.json())
// // app.use(bodyparser.urlencoded({extended:true}))
// // var cors=require('./Router/cors.js');
// // 'https://www.sandbox.paypal.com/',
// allowCrossDomain = function(req, res, next) {
//             var headers = res.headers;
        // headers['Access-Control-Allow-Origin'] = '*';
        // headers['Access-Control-Allow-Headers'] = 'X-Requested-With';
        // headers['Access-Control-Allow-Credentials'] = 'true';

        // console.log(req.method)

    // res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    // res.setHeader('Access-Control-Allow-Credentials', 'true')
//     if ('OPTIONS' === req.method) {
//         console.log(req.method +'Ok')
//         var headers = res.headers;
//         headers['Access-Control-Allow-Origin'] = '*';
//         headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, Content-Length, X-Requested-With';
//         headers['Access-Control-Allow-Credentials'] = 'true';
//     //   res.send(200);
//     next()
//     } else {
//       next();
//     }
//   };
  
//   app.use(allowCrossDomain);
// // app.use('/',cors)

// //appmyapp.use(connect.static(router))
// // myapp.use(function (req, res, next) { 
// //     res.setHeader("Access-Control-Allow-Origin", "https://www.sandbox.paypal.com/")
// //     next()
// //  })
// // myapp.use(cors())
// //  app.use(function(req, res, next) {
// //     res.header("Access-Control-Allow-Origin", "http://localhost:8080");
// //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// //     next();
// // });
// // app.use(function(req, response, next) {
// //     response.header("Access-Control-Allow-Origin", "http://localhost:8080/");
// //     response.setHeader("Access-Control-Allow-Credentials", "true");
// //     response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
// //     response.setHeader("Access-Control-Max-Age", "3600");
// //     response.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me");
// //     // chain.doFilter(req, res);
// //     // res.header("Access-Control-Allow-Origin", "http://localhost:8080/");
// //     // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// //     next();
// // });
// // myapp.use(function(req, res, next) {
// //     res.header('Access-Control-Allow-Origin','http://127.0.0.1:8080')
// //     // res.header('Access-Control-Allow-Origin','https://www.sandbox.paypal.com')
// //     // res.header('Access-Control-Allow-Credentials',true)
// //     next();
// // });


// // //app.use(express.static(__dirname));
// // myapp.use(function(req, res, next) {
// //     // res.header('Access-Control-Allow-Headers', 'X-Custom-Header')
// //     res.header('Access-Control-Allow-Origin','http://localhost:8080')
// //     // res.header('Access-Control-Allow-Credentials','true')
// //     // res.header("Access-Control-Allow-Methods","POST, GET, OPTIONS, DELETE");
// //     // res.header('Access-Control-Request-Headers','X-PINGOTHER, Content-Type')
// //     // res.header('Access-Control-Expose-Headers','Content-Length, X-Kuma-Revision')
// //     next();
// // });
// // myapp.use(cors({credentials: true, origin: 'https://www.sandbox.paypal.com'}))
// // var host = process.env.HOST || 'http://localhost';
// // // Listen on a specific port via the PORT environment variable
// // var port = process.env.PORT || 8889;
// // var cors_proxy = require('cors-anywhere');
// // cors_proxy.createServer({
// //     originWhitelist: [], // Allow all origins
// //     requireHeader: ['origin', 'x-requested-with'],
// //     removeHeaders: ['cookie', 'cookie2']
// // }).listen(port, host, function() {
// //     console.log('Running CORS Anywhere on ' + host + ':' + port);
// // });

// // var server = http.createServer(myapp)
// // server.listen(8889)
// // // myapp.use(cors({credentials: true, origin: 'http://localhost:8080'}))

// // console.log("Starting at http://localhost:8889")

// // var host = 'http://localhost';
// // // Listen on a specific port via the PORT environment variable
// // var port = 8080;

// // cors_proxy.createServer({
// //     originWhitelist: [], // Allow all origins
// //     requireHeader: ['origin', 'x-requested-with'],
// //     // removeHeaders: ['cookie', 'cookie2']
// // }).listen(port, host, function() {
// //     console.log('Running CORS Anywhere on ' + host + ':' + port);
// // });


// // app.use('/', function(req, res) {  
// //     var url = 'http://localhost:8080/' + req.url;
// //     req.pipe(request(url)).pipe(res);
// //   });

// var http = require('http')
// var httpProxy = require('http-proxy')
// var proxy = httpProxy.createProxyServer({})
// var router = require('./Router/router.js')
// // var server = express()

// var server = http.createServer(function (req, res) {
//     console.log(req.url) 
//     proxy.web(req, res, {target : 'http://localhost:8080'})
// })

// server.use('/', router)
 


// // myapp.use(cors_proxy)
// // cors_proxy.createServer({ 
// //     originWhitelist: [], // Allow all origins
// //     requireHeader: ['origin', 'x-requested-with'],
// //     removeHeaders: ['cookie', 'cookie2']
// // }).listen(8080)
// //  console.log("on http:localhost:8080")


// // # with custom port: CORSPROXY_PORT=1234 corsproxy
// // # with custom host: CORSPROXY_HOST=localhost corsproxy
// // # with debug server: DEBUG=1 corsproxy
// // # with custom payload max bytes set to 10MB (1MB by default): CORSPROXY_MAX_PAYLOAD=10485760 corsproxy



// app.use('/', router)
// var port = process.env.PORT || 8080;
// http.createServer(app,function(proxyReq, proxyResp) {
//     console.log('00P')
//     var params = url.parse(proxyReq.url, true);
//     var req = http.request('/', function(req,res) {
//         var headers = res.headers;
//         headers['Access-Control-Allow-Origin'] = '*';
//         headers['Access-Control-Allow-Headers'] = 'X-Requested-With';
//         proxyResp.writeHead(200, headers);

//         res.on('data', function(chunk) {
//             proxyResp.write(chunk);
//         });

//         res.on('end', function() {
//             proxyResp.end();
//         });
//     });

//     req.on('error', function(e) {
//         console.log('problem with request: ' + e.message);
//         proxyResp.writeHead(503);
//         proxyResp.write("An error happened!");
//         proxyResp.end();
//     });
//     req.end();

// }).listen(8080);
