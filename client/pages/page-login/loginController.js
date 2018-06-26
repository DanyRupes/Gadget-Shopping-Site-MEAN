angular.module("Login",[])
.controller("loginController", function ($scope, $http,$window,$rootScope,$mdDialog) {


    var errPass = $mdDialog.confirm()
    .title('Password InCorrect')
    .textContent('Please Check Your Passowrd')
    .ok('Okay')
    .clickOutsideToClose('true')

    var errMail = $mdDialog.confirm()
    .title('Not Matching any Email\'S')
    .textContent('Please Register')
    .ok('Okay')
    .clickOutsideToClose('false')
    // console.log(localStorage.getItem("user_present"))
    $scope.showForget = false

    $scope.login = function () { 
        if(localStorage.getItem('user_present')=='false' || localStorage.getItem('user_present')==null){
        $http({
            url : '/login',
            method : 'POST',
            data : {
                email : $scope.email_,
                password : $scope.pass_
            }
        }).then((result) => {
            // console.log(result)
            try {
                // logService.toLog = false;
                localStorage.setItem('user_name', result.data.name)
                localStorage.setItem('user_email', result.data.email)
                localStorage.setItem('user_present', true)
            }
            catch(e){
                console.log("localStorage Error" +e)      
            }

                window.location.href = '/#/profile'
            }).catch((err) => {
            console.log(err.status)
            if(err.status == 909){
                $mdDialog.show(errMail).then(()=>{
                    window.location.href = '/#/register'
                },()=>{window.location.reload()})
            }
            else{
                $scope.showForget = true;
                $mdDialog.show(errPass).then(function () {
                    $scope.passowrd = "" 
                },function(){
                    $scope.passowrd = ""
                })
            }

        });
        }
        else{
            console.log('already Logged')
        }
    }
})
    // console.log("logged" +logService.globLog)
    // logService.globLogIn = false;
// $css.bind({
//     href : 'pages/page-login/loginStyle.css'
// },$scope)
// console.log("Login 1: "+logService.globLogIn)


            // console.log("Login 2: "+logService.globLogIn)

            // logService.globLogIn = true;
            // $rootScope.glob = false;
            
            // logService.user_email = result.data.email;
            // logService.user_name = result.data.name;
            // logService.user_cart = result.data.cart;
                // alert('Login Successfull')

    // var a = {}
    // console.log(JSON.stringify(localStorage.getItem('profile')))
    // a = JSON.stringify(localStorage.getItem('profile'))
    // console.log(localStorage.getItem('profile'['name']))
    // b = JSON.parse(a)
    // console.log(b)
    // console.log("log user" +localStorage.getItem('profile')['user_name'])
 
    //   console.log(localStorage.getItem('user_present')==null)