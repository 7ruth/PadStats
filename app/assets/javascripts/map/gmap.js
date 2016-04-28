$(window).on("load", function() {
  loadScript();
});

//put this all into app object at refactoring time

var map;
var address_latlng;

var infowindow;
var distances=[];

var address_lat;
var address_lng;
var zoom;

var directionsDisplay;
var directionsService;
var arrLatLon = [];
var homeLatlng;
var destinationID;

var cumulativedistance=0;
var cumulativetime=0;




var icons = [
  'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
  'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
  'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
  'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
];

var places_types = [
    'convenience_store',
    'gym',
    'grocery_or_supermarket',
    'school',
    'library',
    'museum'
];


if (gon.address === null || gon.address === "null") {
  zoom = 19;
} else {
  zoom = 14;
}


function initialize() {

  // directionsDisplay = new google.maps.DirectionsRenderer({
  //   draggable: true,
  //   map: map,
  //   polylineOptions: polylineOptionsActual,
  //   });

  var mapOptions = {
    // center: new google.maps.LatLng(45.434209,12.339083),
    zoom: zoom,
    mapTypeId: google.maps.MapTypeId.SATELLITE,
    panControl: true,
    panControlOptions: {position: google.maps.ControlPosition.TOP_LEFT},
    zoomControl: true,
		zoomControlOptions: {
		  style: google.maps.ZoomControlStyle.LARGE,
		  position: google.maps.ControlPosition.TOP_LEFT
		},
    scaleControl: false,
    streetViewControl: true,
    overviewMapControl: true
  };

    // initializing map
  map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);
  directionsService = new google.maps.DirectionsService();

  // directionsDisplay.setMap(map);

   // geocoding
  var geocoding  = new google.maps.Geocoder();
      // $("#submit_button_geocoding").click(function(){
  codeAddress(geocoding);
      // });
  }

  var info;

function codeAddress(geocoding){
  var address;



  if (gon.address === null || gon.address === "null"){
    map.setCenter(new google.maps.LatLng(43.723200,10.396629));
  } else {

    address = gon.address;
    if(address.length > 0){
      geocoding.geocode({'address': address},function(results, status){
        if(status == google.maps.GeocoderStatus.OK){
          map.setCenter(results[0].geometry.location);
          address_latlng=results[0].geometry.location;
          var marker  =  new google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
            icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
          });

address_lat = address_latlng.lat();
address_lng = address_latlng.lng();



//Loop here to get the multiple search function... lets therubyracer

for (var i=0; i<gon.jsindex.length-1; i++) {
            var service = new google.maps.places.PlacesService(map);
            service.nearbySearch({
              location: address_latlng,
              radius: 3000,
              type: [places_types[gon.jsindex[i]]]
            }, callback);

          }
                      }else{
                      alert("Geocode was not successful for the following reason: " + status);
                    }
                  });
                }else{
                  alert("Search field can't be blank");
                }
              }
            }



function loadScript() {
	console.log("map loading ...");
  var script = document.createElement('script');
  script.type = 'text/javascript';
  //'https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBJYFdplGeKUUEmGZ-vL4ydiSZ09Khsa_o&sensor=false&libraries=drawing'
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp' +
    //'&v=3.14'+
    //'&key=AIzaSyAr03bSSSjUhGmYwzIiQLcAahivnZDbVH0'+
    '&libraries=drawing,geometry,places'+
    '&callback=initialize';
  document.body.appendChild(script);
}

function calcDistance (fromLat, fromLng, toLat, toLng) {
  return google.maps.geometry.spherical.computeDistanceBetween(
    new google.maps.LatLng(fromLat, fromLng), new google.maps.LatLng(toLat, toLng));
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {

    for (var i = 0; i < results.length; i++) {
      distances = [];
      var latitude = results[i].geometry.location.lat();
      var longitude = results[i].geometry.location.lng();
        distances.push(calcDistance(address_lat,address_lng,latitude,longitude));
    }

        var min_of_array = Math.min.apply(Math, distances);
        var index = distances.indexOf(min_of_array);
        createMarker(results[index]);

        var start = gon.address;
        var end = results[index].geometry.location;
        var request = {
          origin:start,
          destination:end,
          travelMode: google.maps.DirectionsTravelMode.DRIVING
        };

        directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          renderDirections(response);
        }
        });

  }
}

function createMarker(place) {

    if (place === "undefined" || place === undefined){
      return;
    } else {
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location,
        });

        infowindow = new google.maps.InfoWindow();
        infowindow.setContent(place.name);
        infowindow.open(map, marker);

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
  }
}

function polylineOptionsActual() {
var polylineOptionsActual = new google.maps.Polyline({
  strokeColor: '#FF3D03',
  strokeOpacity: 1.0,
  strokeWeight: 10
});}

function rainbow(numOfSteps, step) {
  // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
  // Adam Cole, 2011-Sept-14
  // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
  var r, g, b;
  var h = step / numOfSteps;
  var i = ~~(h * 6);
  var f = h * 6 - i;
  var q = 1 - f;
  switch(i % 6){
      case 0: r = 1, g = f, b = 0; break;
      case 1: r = q, g = 1, b = 0; break;
      case 2: r = 0, g = 1, b = f; break;
      case 3: r = 0, g = q, b = 1; break;
      case 4: r = f, g = 0, b = 1; break;
      case 5: r = 1, g = 0, b = q; break;
  }
  var c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
  return (c);
}

  function computetime(result) {
    var time=0;
    var mytravelroute=result.routes[0];
    for (i = 0; i < mytravelroute.legs.length; i++) {
      time += mytravelroute.legs[i].duration.value;
      cumulativetime += mytravelroute.legs[i].duration.value;
      }

    var totalSec = time;
    var hours = parseInt( totalSec / 3600 );
    var minutes = parseInt( totalSec / 60 ) % 60;
    var seconds = totalSec % 60;

    var result = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);

    // if (document.getElementById("time").innerHTML == "") {
    //   document.getElementById("time").innerHTML = result;}
    // else {
    //   if (document.getElementById("time1").innerHTML == "") {document.getElementById("time1").innerHTML = result;}
    // else {document.getElementById("time2").innerHTML = result;
    // }

    var totalSec1 = cumulativetime;
    var hours1 = parseInt( totalSec1 / 3600 );
    var minutes1 = parseInt( totalSec1 / 60 ) % 60;
    var seconds1 = totalSec1 % 60;

    var result1 = (hours1 < 10 ? "0" + hours1 : hours1) + ":" + (minutes1 < 10 ? "0" + minutes1 : minutes1) + ":" + (seconds1  < 10 ? "0" + seconds1 : seconds1);

    document.getElementsByClassName('search_box')[0].placeholder = "Total travel time is " + result1;

    }


function renderDirections(response) {
    var directionsRenderer = new google.maps.DirectionsRenderer({
          suppressMarkers: true,
          draggable: true,
          map: map,
          polylineOptions: new google.maps.Polyline({strokeColor: rainbow(Math.round(Math.random() * 100),Math.round(Math.random() * 9)),
          })});

    directionsRenderer.setMap(map);
    directionsRenderer.setDirections(response);
  computetime(directionsRenderer.directions);
}
