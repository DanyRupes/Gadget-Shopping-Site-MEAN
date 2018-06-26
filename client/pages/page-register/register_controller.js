angular.module("RegisterModule",[])
.controller('register_controller', function ($scope,$http, $window,$mdDialog) { 

    var okregDialog = $mdDialog.confirm()
    .title('Account created successfully')
    .textContent("Let's Continue with a login...")
    .clickOutsideToClose('true')
    .ok('LogIn');
    var errDialog = $mdDialog.confirm()
    .title('Please Login')
    .textContent('Account Already Present..')
    .ok('Login')
    .clickOutsideToClose('false')

    $scope.register =  function(){

        var re = new RegExp("([\\w\\.\\-_]+)?\\w+@[\\w-_]+(\\.\\w+){1,}")
        var check = re.test($scope.reg_email)

            console.log($scope.Pass+" "+$scope.Re_Pass)
            console.log(!($scope.Pass === $scope.Re_Pass))
            if(!($scope.reg_Pass === $scope.Re_Pass)){
                document.querySelector('#notMatch').textContent = "Password Not Matched.."
                $scope.Re_Pass = ""
                
            }
            else{
                console.log($scope.reg_Pass)
                $http({
            url : '/register',
            data : {
                name : $scope.reg_name,
                email : $scope.reg_email,
                password: $scope.reg_Pass,
            },
            method: "POST"
        }).then((result) => {
            $mdDialog.show(okregDialog).then(function () { 
                // console.log(result)
                window.location.href = '/#/login'
             },function(){
                 window.location.reload()
             })
    
        }).catch((err) => {
            if(err.status == 999){
                $mdDialog.show(errDialog).then(function () { 
                    window.location.href = '/#/login'
                 },function(){
                     window.location.reload()
                 })
            }
        });

            }
        
    }
})

        //     alert("Account created Successfully!!")
        //     console.log(output)
        //   if(output === "exist"){alert("Account already Exist..!")}
        //   else{alert("Account created Successfully!!")}
        //   $window.location.reload(true);
        //     },
        // function(err){
        //     alert(err)
        // });
        