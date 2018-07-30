angular.module("Profile",[])
.controller("profileController", function ($mdDialog,$scope,$http,$rootScope,Upload) { 



    var plLogin = $mdDialog.confirm()
    .title('Login')
    .textContent('Please Login or SignUp to Continue..')
    .ok('Login')
    .clickOutsideToClose(false)  
    
    $scope.propic = "avatar-no.png";
    var userName =  localStorage.getItem('user_name')
    var userEmail =  localStorage.getItem('user_email')
    var userPresent =  localStorage.getItem('user_present')
    if(userPresent=='true'){
        $http({
            url : '/load_profile',
            data : {
                name : userName,
                email : userEmail,
            },
            method: "POST"
        })
    .then((output) => {
             Porfile = output.data;
             $scope.Cart = Porfile.cart;
             $scope.user_name = Porfile.name; 
             $scope.user_email = Porfile.email; 
             $scope.propic = Porfile.userpic;
         }).catch((err) => {
             console.log(err)
         });
    }
    else {
        $mdDialog.show(plLogin).then(function(){
            window.location.href = '/#/login'
        }, function(){
            window.location.href = '/#/home'
        })

    }
    // try{
    //     var picpic = $scope.__file.name;
    //     console.log("Pic"+$scope.__file)
    // }
    // catch(e){console.log(e)}

    $scope.updatePic = function (_file) { 
        console.log(_file.name)
        // console.log("Pic"+$scope.__file)
        if(_file.name !=null){
            Upload.upload({
                url : '/updatePropic',
                method : 'POST',
                data : {
                    image : _file,
                    userEmail : userEmail,
                }
            }).then((out)=>{
                $scope.propic = _file.name;
            }).catch((err)=>{console.log(err)})
        }
        else {console.log("NO file ..Null")}
     }
        $scope.payPal = function (item) {
           document.querySelector('.overlay').style.display = "block";
            $http({
                method : 'POST',
                url : '/payNow',
                data : {
                    item_name : item.name,
                    // item_model :item.model,
                    item_price : item.price,
                    item_desc : item.description,
                    // item_img : 'imagedata'
                },
  
            }).then((out)=>{
 
                window.location.href = out.data;
                
                   $http({
                    method : 'GET',
                    url : out.data,
                }).then((myPayment)=>{
                    console.log(myPayment)
                    console.log("Payer ID and Payment ID received")
                 
                }).catch((Er)=>{
                    // alert("What is this")
                    console.log(Er)
                })  
            }).catch((err)=>{
                console.log('ErrrorP' +err)
            })
          }
     

        $scope.rem_cart = function (rItem,e) { 

            $http({
                url : '/removeCart',
                method : 'POST',
                data  : {
                    user_name : userName,
                    itemId : rItem._id
                }
            }).then((output)=>{
               
                angular.element(e.target).parent().remove()

            }).catch((err)=>{
                console.log(err)
            })
         }
        })
                        // res.setHeader('Access-Control-Allow-Origin','https://www.sandbox.paypal.com')

                //  $http.defaults.headers.post = {}
    // $scope.payPal = function (item) {  

        // $httpProvider.defaults.headers = 'Access-Control-Allow-Origin','https://www.sandbox.paypal.com/'
        // var headers = {
        //     'Access-Control-Allow-Origin' : '*',
        //     'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
        //     'Content-Type': 'application/json',
        //     'Accept': 'application/json',
        //     'Access-Control-Allow-Credentials':'true',
        //     'xsrfWhitelistedOrigins' : ['https://www.sandbox.paypal.com/'],
        // };

                      // application/x-www-form-urlencoded,
                // headers : {
                //     // 'content-type': 'application/json,"text/html"',
                //     'Access-Control-Allow-Headers' : 'Content-Type , charset=UTF-8,text/html',
                //     'Access-Control-Allow-Origin' : '*',
                //     'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
                // }
                // // headers : headers,
                
        //   headers : {
        //     'Access-Control-Allow-Origin': 'https://www.sandbox.paypal.com/',
        //     'Content-Type':'application/x-www-form-urlencoded',
        //     // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
        //     'X-Requested-With': 'XMLHttpRequest',
        //     // 'Access-Control-Allow-Credentials': 'true',
        // },
   
                        // var url = 'https://google.com/';

                // var invocation = new XMLHttpRequest();
                // callOtherDomain('https://google.com/')
                // function callOtherDomain(url){
                // if(invocation) {
                    // invocation.open('GET', 'https://google.com/', true);
                    // invocation.withCredentials = true;
                    // invocation.onreadystatechange = handler;
                    // invocation.send(); 
                // }
                // }
    //  }
// ,(res)=>{
    // res.setHeader("Access-Control-Allow-Origin", "http://localhost:8889");
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // res.setHeader('Access-Control-Allow-Credentials', true);
// }


             // headers : {}0,
        // //    'XMLHttpRequest' :{'Access-Control-Allow-Origin' : 'https://www.sandbox.paypal.com'}\
        // headers : {'Access-Control-Allow-Origin':'https://www.sandbox.paypal.com/cgi-bin/',"Access-Control-Allow-Credentials":"true",
        // 'Access-Control-Allow-Methods' :['GET','POST','PUT','DELETE','OPTIONS']},
                    // ["Access-Control-Allow-Headers", "X-Requested-With, Content-Type"],
                    // ['Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE']],
            // 'xsrfWhitelistedOrigins' : ['https://www.sandbox.paypal.com/']
            // 'Access-Contr    ol-Allow-Headers' : '*'
            // 'X-Requested-With' :'XMLHttpRequest',
            // XMLHttpRequest : {'Access-Control-Allow-Origin' : 'https://www.sandbox.paypal.com'},