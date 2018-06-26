var app = angular.module("item_list_module",[]);
app.controller("H_item_list_controller", function ($scope, $http,$window,$mdDialog) { 
    var alertt = $scope.alerts;
    $scope.alerts = [];
    var response = []
    var confirm = $mdDialog.confirm()
    .title('Confirm')
    .textContent('Are you confirm adding Items')
    .ok('Add')
    .cancel('Dont Add')
    . clickOutsideToClose(true)

    var logIn = $mdDialog.confirm()
    .title('Login')
    .textContent('Please Login or Signup to Continue..')
    .ok('Login')
    .cancel('signup')
    . clickOutsideToClose(true)


    $http({
       url : '/load_item',
        method : 'GET',
        // responseType: 'arraybuffer'
    }).then((output) => {

        response = output.data;
        // console.log(output.data)
        $scope.items_Data = response;
 
    }).catch((err) => {
        console.log(err)
    });
    var userName =  localStorage.getItem('user_name')
    var userEmail =  localStorage.getItem('user_email')
    var userPresent =  localStorage.getItem('user_present')
    $scope.addCart = function(itm){
        if (userPresent=='true'){
                $mdDialog.show(confirm).then(function(){
                    $http({
                        url : '/addtoMyCart',
                        method : "POST",
                        data : {
                            item : itm,
                            email : userEmail,
                        },
                        
                    }).then(function () { 
                        alertt.push({msg: 'Item Added to Your Cart'});
                    })
                },function () {})
        }
        else {
                    //accept login
                //add to cart ok cancel dialogue
                $mdDialog.show(logIn).then(function(){
                    //Redirecting to login page
                    window.location.href = '/#/login';
                }, function () { 
                    window.location.href = '/#/register'
                })
                }
    }///add ot cart ends

    $scope.closeAlert = function(index) {
        console.log(index)
        $scope.alerts.splice(index, 1);
      };


 })

         // var temp = response[19]
        // var pic =response[0].image.data.data;
        // console.log(response)
    //   function _arrayBufferToBase64(buffer) {
    //     var binary = '';
    //     var bytes = new Uint8Array(buffer);
    //     var len = bytes.byteLength;
    //     for (var i = 0; i < len; i++) {
    //       binary += String.fromCharCode(bytes[i]);
    //     }
    //     return window.btoa(binary);
    //   }

       // console.log(pic)
        // console.log("Response : "+JSON.stringify(response[19].image.data))    
        // console.log("Response : "+ JSON.stringify(response[19].image.data.data))     
        // var str = _arrayBufferToBase64(output.data)
        // $scope.pic = output.data;
        // console.log(str)
