var it = angular.module("Adder",[])

it.controller("adderController",function($scope,Upload,$window) { 
    $scope.types_ = ['Mobile','Laptop','Tablet','Accessories','Camera','speaker']

    $scope.adder = function(){
        Upload.upload({
            url:'/add_item', 
            method : 'POST',
            data: {
                id: $scope.id,
                type:$scope.type_,
                name:$scope.name_,
                model:$scope.model,
                image : $scope.img_file,
                description:$scope.desc,
                price:$scope.price,
                stock:$scope.stock,
                warranty:$scope.warranty,
                offer:$scope.offer,
                emi:$scope.emi,
            },  
        }).then(function(output)  {
           console.log(output)
           alert("Addedd As Success") 

        });
    
    }
 })
        //    $window.location.reload() 
        //    window.location.href = '/#/list_home';   
//  it.directive('fileinput', function () {
//     return {
//     require : 'ngModel',
//     link : function postLink (scope,elem,attrs,ngModel) { 
//         elem.on('change', function (e) { 
//             var files = elem[0].files;
//             ngModel.$setViewValue(files)
//             // console.log(files[0].name)
//             console.log(files[0])
//             img_details = {
//                 i_name : files[0].name,
//             }
//             console.log(img_details.i_name)
//          })
//      }        
//     } 
//    })

 