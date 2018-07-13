 var appAnglr = angular.module('addShop', []);
    appAnglr.controller('addShopController', function($scope,$rootScope,$http){
    // $scope.name = alert('hello Map')

var map;
var infowindow;
var currentLatLng;

    $scope.scity = "Coimbatore"
    $scope.addMeDood = function () { 
        $http({
            method  :'POST',
            url  : '/addMeDood',
            data : {
                sid : $scope.sid,
                sname : $scope.sname,
                owner : $scope.owner,
                mail : $scope.mail,
                phone : $scope.phone,
                lice : $scope.lice,
                scity : $scope.scity
            }
        }).then((out) => {
            window.alert("Successfully Submitted")
            setTimeout(1000)
            window.location.reload();
        }).catch((err) => {
            console.log(err)
            alert("Something Went Wrong")
        });
     }


// new google.maps.event.addDomListener(window, 'load', myMap);
})

// appAnglr.directive ('addshopdirect',function () { 
//     return {
//         require: 'ngModel',
//         link : function(scope, element, attr, addShopController){
//             function sformValid(value) { 
//                 console.log(value)
                
//              }
//              addShopController.$parsers.push(sformValid)
//         }
//     }
//  })
//html code for add myMap script inside html
// appAnglr.directive('htmlcode', function() {
//   return {
//     restrict: 'E',
//     link: function($scope, $el) {

//       var script = document.createElement('script');
//       script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDwArf3UZ8LHQVP9t7leDaRa3GOoThT1zc&libraries=places&callback=myMap'
//       $el.append(script);
//     }
//   }
// });


////googel map call back functions
