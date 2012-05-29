/* Globals */
var map;
var currentLocation;
var destination;

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
 * input: position A Position object as defined by W3C's geolocation API.
 */
function createMap(position) {

  currentLocation = position2LatLng(position);

  var mapOptions = {
    center: currentLocation,
    zoom: 18,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

  //temporary hack to place a marker at currenLocation. Delete once testing is done.
  var markerOptions = {
    animation: google.maps.Animation.DROP,
    map: map,
    position: currentLocation,
    title: "Current position",
    visible: true
  }
  var currenPositionMarker = new google.maps.Marker(markerOptions);

}

/* Convert the user's destination address to latitude and longitude via maps.google.Geocoder. */
function convert2LatLng() {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({address: document.getElementById("destinationAddress").value}, geocodeHandler);
}

/* Center the map on the destination coordinates
 *
 * input geocoderResults The result from calling maps.google.Geocoder.geocode().
 * input geocoderStatus  Indicates whether the call was a success or resulted in error.
 */
function geocodeHandler(geocoderResults, geocoderStatus) {
  if (geocoderStatus == google.maps.GeocoderStatus.OK) {
    destination = geocoderResults[0].geometry.location;
    map.setCenter(destination);

    //temporary hack to place a marker at destination. Deleted once testing is done.
    var markerOptions = {
      animation: google.maps.Animation.DROP,
      map: map,
      position: destination,
      title: "Destination",
      visible: true
    }
    var currenPositionMarker = new google.maps.Marker(markerOptions);
  }
  else {
    alert("Geocoder failed for the following reason: " + geocoderStatus);
  }
}

/* Converts a Position object into a google.maps.LatLng object 
 *
 * input: posittion The Position object returned by the browser goelocation service.
 */
function position2LatLng(position) {
  return new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
}

/* Message explaining why the application has not started. 
 * 
 * input: error The error returned by the browser's Geolocation service
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

