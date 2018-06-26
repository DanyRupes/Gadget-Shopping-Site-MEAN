var appAnglr = angular.module('HomeModule', []);
appAnglr.controller('homeController', function($scope,$rootScope){


var map;
var infowindow;
var currentLatLng;


})


appAnglr.directive('gadgetmap', function() {
  return {
    restrict: 'E',
    link: function($scope, $el) {

      var script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDwArf3UZ8LHQVP9t7leDaRa3GOoThT1zc&libraries=places&callback=myMap'
      $el.append(script);
    }
  }
});

////googel map call back functions
function myMap() {
  // console.log("check 3")
      var LoC = {lat: 11.0168, lng:  76.9558}; 
  
       map = new google.maps.Map(document.getElementById('map'), {
          center: LoC,
          zoom: 18
    });
  
  //nearbySearch Start 
      infowindow = new google.maps.InfoWindow();
      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch({
      location: LoC,
      radius: 1000,
      type: ['electronics_store'] ////https://developers.google.com/places/supported_types
      }, callback);
     
    }
    function callback(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }
      }
    }
  //Marker
    function createMarker (place){
      var locatePlace = place.geometry.location;
      var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location,
          animation:google.maps.Animation.DROP,
        });
      google.maps.event.addListener(marker, 'mouseover', function() {
        infowindow.setContent(place.name + " " +place.vicinity+ " ")
              // console.log(place)
          infowindow.open(map,this);
    
          // window.close();
          });
  
          google.maps.event.addListener(marker, 'click', function() {
          window.location.href = '/#/list_home';
      });
    }


        // $scope.name = alert('hello Map')
    // console.log("Home 1: "+logService.globLogIn)  
// myMap();
// console.log("check 1")

// new google.maps.event.addDomListener(window, 'load', myMap);

// console.log("check 2")
////html code for add myMap script inside html
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
    




          

// //Getting current location
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(function(position) {
//                 currentLatLng = {
//                 lat: position.coords.latitude,
//                 lng: position.coords.longitude
//               };
//               //fork nearbySearch
//               NearbySearch(currentLatLng);
//               infowindow.setPosition(currentLatLng);
//               infowindow.setContent('Your Location which GeoLocation Found');
//               infowindow.open(map);
//               map.setCenter(currentLatLng);
//             }, function() {
//               handleLocationError(true, infowindow, map.getCenter());
//             });
//           } else {
//             // Browser doesn't support Geolocation
//             handleLocationError(false, infowindow, map.getCenter());
//           }




//     }


// //GeoLocation Err handlr      
//     function handleLocationError(browserHasGeolocation, infowindow, currentLatLng) {
//         infowindow.setPosition(currentLatLng);
//         infowindow.setContent(browserHasGeolocation ?
//                               'Error: The Geolocation service failed.' :
//                               'Error: Your browser doesn\'t support geolocation.');
//                               infowindow.open(map);
//       }

// //NearbyCallback
           // service = new google.maps.places.PlacesService(map);
        // map.data.loadGeoJson("data.json");} 

                // var initMap = {
    //     center: pyrmont,
    //     zoom: 15,
    //     radius:500,
    //     // mapTypeId: google.maps.MapTypeId.HYBRID
    // }
    // var map = new google.maps.Map(document.getElementById("map"), initMap);
    // var serviceNB = new google.maps.places.PlacesService(map);