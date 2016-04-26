$(window).on("load", function() {
  loadScript();
});

// $("#home-link").on("click", function() {
//   console.log("hi");
//   loadScript();
// });

var map;

function initialize() {

  var mapOptions = {
          // center: new google.maps.LatLng(45.434209,12.339083),
          zoom: 18,
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
  if (gon.address == "null"){
    map.setCenter(new google.maps.LatLng(43.723200,10.396629));
  } else {
    address = gon.address;
    if(address.length > 0){
      geocoding.geocode({'address': address},function(results, status){
        if(status == google.maps.GeocoderStatus.OK){
          map.setCenter(results[0].geometry.location);
          var marker  =  new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
          });
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
    //'&key=AIzaSyBJYFdplGeKUUEmGZ-vL4ydiSZ09Khsa_o'+
    '&libraries=drawing'+
    '&callback=initialize';
  document.body.appendChild(script);

}
