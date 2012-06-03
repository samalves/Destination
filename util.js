/*
 * Purpose: Alert the user when they're within 1/2 mile radius of their train stop
 *
 * Author: Sam Alves
 * Email: salves1@my.ccri.edu
 */


/* Global Variables */
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

/* Determine the destination's coordinates then draw it on the map. */
function convert2LatLng() {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({address: document.getElementById("destinationAddress").value}, drawDestination);
}

/* Center the map on the destination coordinates, then continuously update the map
 * as the user's position changes.
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

    // Repeatedly request an update to the current position
    navigator.geolocation.watchPosition(updateCurrentPosition, 
                                        geolocationErrorHandler, 
                                        {enableHighAccuracy: true, timeout: 10 * 1000, maximumAge: 0 });

  }
  else {
    alert("Geocoder failed for the following reason: " + status);
  }
}

/* Update the currentPosition marker with the current GPS location. 
 *
 * parameter: position the Position object returned by the watchPosition function,
                       as specified by W3C.
 */
function updateCurrentPosition(position) {
  latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

  // Move the currentPosition marker to the new position
  currentPosition.setPosition(latLng);

  if (distance(destination.getPosition(), currentPosition.getPosition()) <= 0.5) {
    // TODO: issues with audio element
    //var alarm = document.getElementById('alarm');
    //alarm.play();
    alert("Your close to your stop!");
  }
}

/* Calculate the distance (in miles) between two coordinate points.
 *
 * Attribution: http://movable-type.co.uk/scripts/latlong.html
 *
 * parameter: start A google.maps.latLng object
 * parameter: end   A google.maps.latLng object
 */
function distance(start, end) {

  var R = 3959; // miles

  // Convert to radians
  var lat1 = start.lat() * Math.PI/180;
  var lat2 = end.lat()   * Math.PI/180;
  var lon1 = start.lng() * Math.PI/180;
  var lon2 = end.lng()   * Math.PI/180;

  var d = Math.acos(Math.sin(lat1) * Math.sin(lat2) + 
                    Math.cos(lat1) * Math.cos(lat2) * 
                    Math.cos(lon2-lon1)) * R;

  return d;

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

  alert (errorMsg);
}

window.onload = initialize;

