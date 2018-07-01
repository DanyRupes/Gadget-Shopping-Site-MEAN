var app =angular.module('myStore',['HomeModule','addShop',
    'OrderModule','RegisterModule','item_list_module','Adder','Login','ngFileUpload',
    'ngRoute','ngMaterial', 'ngMessages','ngAnimate', 'ngSanitize', 'ui.bootstrap','Aboutus',
    'Profile','angularCSS']);

    app.config(function($routeProvider, $locationProvider,$httpProvider){
   
    $routeProvider
    .when('/home', {
        templateUrl : 'pages/page-home/home.html',
        controller : 'homeController',
        css : 'pages/page-home/home_style.css'
    })
    .when('/list_home', {
        templateUrl : 'pages/page-item-list-home/H_item_list.html',
        controller : 'H_item_list_controller',
        css : 'pages/page-item-list-home/item_list_Style.css'
    })
    .when('/order', {
        templateUrl : 'pages/page-order/order.html',
        controller : 'orderController'
    })
    .when('/register',{
        templateUrl : 'pages/page-register/register.html',
        controller : 'register_controller',
        css : 'pages/page-register/registerStyle.css'
    })
    .when('/addShop',{
        templateUrl : 'pages/page-addShop/addShop.html',
        controller : 'addShopController',
   
    })
    .when('/aboutus',{
        templateUrl : 'pages/page-aboutUS/aboutus.html',
        controller : 'aboutusController',
        css : 'pages/page-aboutUS/aboutStyle.css'
    })
    .when('/profile',{
        templateUrl : 'pages/page-profile/profilepage.html',
        controller : 'profileController',
        css : '/pages/page-profile/profileStyle.css'
    })
    .when('/login', {
        templateUrl : 'pages/page-login/login.html',
        controller : 'loginController',
        css : '/pages/page-login/loginStyle.css'
    })
    .when('/itemAdd', {
        templateUrl : 'pages/page-item-adder/adder.html',
        controller : 'adderController',
    })
    .when('/contactSuccess',{
        templateUrl : 'pages/page-success/show.html'
    })
    .otherwise ({
        redirectTo : '/home'
    })
    $locationProvider.hashPrefix(''); 
    // $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

})
if(window.localStorage !==null){
    window.localStorage.clear();
}
window.localStorage.setItem("user_name", undefined)
window.localStorage.setItem("user_email", undefined)
window.localStorage.setItem("user_present", 'false')


app.controller('MainCtrl',function ($rootScope,$scope) { 
    $scope.Log = true

 })
app.directive('mynavbar',function () { 
    return {
        restrict : 'E',
        // transclude : true,
        scope  :false,
        templateUrl : 'pages/page-navbar/nav.html',
        link : function ($scope) {      
            $scope.$watch(function () { return localStorage.getItem('user_present')},function (New,old) { 
                // $scope.changeme ="Dood you did that";
                if(old!==New){
                    if(New==null && old=='true'){
                        // console.log("hi" +New, old)                        
                        $scope.Log = true
                    }
                    else{
                        $scope.Log =false;
                    }
                    // console.log(New, old)
                    // $scope.changeme =true;
                }   
                // console.log(New, old)
                
                // console.log(New, old)
                // $scope.Log =false;        
             })
        },
        controller : function ($scope) { 
            $scope.cleanup = function () { 
                // console.log('cleaning process')
                window.localStorage.clear();
             }
         }
    }
 })

//  app.service('logService', function () {
//         this.toLog = true;
//     // this.user_email;
//     // this.user_name
//     // this.user_cart;
//     // this.test = "hiiii"
// })

    // console.log($rootScope.gLog)
    // console.log('logService.globLogIn ' +logService.globLogIn)
    // $scope.$watch(localStorage.getItem("user_email"),function (New, old) { 
    //     console.log('hii')
    //     if (localStorage.getItem('user_present')=='true'){
    //         $scope.gLog = false;
    //         console.log('hey chenged')
    //     }
    //  })

// app.directive('navlog', function () {
//     return {
//         template:  '<li class="nav-item"><a class="nav-link" href="#/register">Logout</a></li>'
//     };
// });
// ,'logService',

// console.log("apppp.js")