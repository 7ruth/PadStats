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

   // geocoding
      var geocoding  = new google.maps.Geocoder();
      // $("#submit_button_geocoding").click(function(){
        codeAddress(geocoding);
      // });
  }

var info;

function codeAddress(geocoding){
  var address;

  console.log(address);
  console.log("gon.address");
  console.log(gon.address);

  if (gon.address === null || gon.address === "null"){
    map.setCenter(new google.maps.LatLng(43.723200,10.396629));
  } else {

    address = gon.address;
    console.log(address);
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

for (var i=0; i<places_types.length; i++) {
            var service = new google.maps.places.PlacesService(map);
            service.nearbySearch({
              location: address_latlng,
              radius: 3000,
              type: [places_types[i]]
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
console.log(calcDistance(address_lat,address_lng,latitude,longitude));
        distances.push(calcDistance(address_lat,address_lng,latitude,longitude))
    }

        var min_of_array = Math.min.apply(Math, distances);
        var index = distances.indexOf(min_of_array)

        console.log(min_of_array);
        console.log(index);

        console.log("8888888788888888");
          console.log(results[index]);
        console.log("8888888788888888");
        createMarker(results[index]);
  }
}

function createMarker(place) {

    console.log(place);

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
