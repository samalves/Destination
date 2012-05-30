/* Globals */
var map; // Reference our google.maps.Map object

var currentPosition = new google.maps.Marker({
  animation: google.maps.Animation.DROP,
  title: "Current position",
  visible: true
}); 

var destination = new google.maps.Marker({
  icon: "stop.png",
  animation: google.maps.Animation.DROP,
  title: "Destination",
  visible: true
});     

var circle = new google.maps.Circle({
  clickable: false,
  fillColor: "#FF0000",
  fillOpacity: 0.35,
  radius: 804.67200, // This is the meter equivalent of 1/2 a mile.
  strokeColor: "#FF0000",
  strokeOpacity: 0.8,
  strokeWeight: 2
});

/* Determine if this browser implements geolocation. If so, go ahead and
 * create a map centerd on the current location.
 */
function initialize() {

  var geolocationOptions = {
    enableHighAccuracy: true,
    timeout: 10 * 1000 // Wait 10 seconds before timing out.
  };
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(createMap, geolocationErrorHandler, geolocationOptions); 
  }
  else {
    alert("I'm sorry, but for this application to work it will need an updated browser." +
          "\n\nThis app is sure to work with the latest version of Chrome.");
  }
}

/* Draws a map centered on on the given position.
 *
 * parameter: position A Position object as defined by W3C's geolocation API.
 */
function createMap(position) {

  latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

  var mapOptions = {
    center: latLng,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

  currentPosition.setPosition(latLng);
  currentPosition.setMap(map);
}

/* Determine the destination's coordinates then draw it on the map. 
 */
function convert2LatLng() {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({address: document.getElementById("destinationAddress").value}, drawDestination);
}

/* Center the map on the destination coordinates
 *
 * parameter: results The result from calling maps.google.Geocoder.geocode().
 * parameter: status  Indicates whether the call was a success or resulted in error.
 */
function drawDestination(results, status) {
  if (status == google.maps.GeocoderStatus.OK) {
    latLng = results[0].geometry.location;
    map.setCenter(latLng);

    destination.setPosition(latLng);
    destination.setMap(map);

    circle.setCenter(latLng);
    circle.setMap(map);

  }
  else {
    alert("Geocoder failed for the following reason: " + status);
  }
}

/* Message explaining why the application has not started. 
 * 
 * parameter: error The error returned by the browser's Geolocation service
 */
function geolocationErrorHandler(error) {

  var errorMsg;

  switch(error.code) {
    case error.PERMISSION_DENIED:
      errorMsg = "You can't use the appliction if you declined to share your location.";
      break;
    case error.POSITION_UNAVAILABLE:
      errorMsg = "Unable to determine your position.";
      break;
    case error.TIMEOUT:
      errorMsg = "Timed out while trying to get your location.";
      break;
    default:
      errorMsg = "Uknown error while determining your location.";
  }

  alert (errorMsg + " Reload the page to try again.");
}

window.onload = initialize;

