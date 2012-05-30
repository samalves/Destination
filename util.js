/* Globals */
var map;             // google.maps.Map object
var currentPosition; // google.maps.latLng object
var destination;     // google.maps.latLng object

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

  currentPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

  var mapOptions = {
    center: currentPosition,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

  //temporary hack to place a marker at currenLocation. Delete once testing is done.
  var markerOptions = {
    animation: google.maps.Animation.DROP,
    map: map,
    position: currentPosition,
    title: "Current position",
    visible: true
  }
  var currenPositionMarker = new google.maps.Marker(markerOptions);
}

/* Convert the user's destination address to latitude and longitude via the Geocoder object. */
function convert2LatLng() {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({address: document.getElementById("destinationAddress").value}, setDestination);
}

/* Center the map on the destination coordinates
 *
 * input results The result from calling maps.google.Geocoder.geocode().
 * input status  Indicates whether the call was a success or resulted in error.
 */
function setDestination(results, status) {
  if (status == google.maps.GeocoderStatus.OK) {
    destination = results[0].geometry.location;
    map.setCenter(destination);

    //temporary hack to place a marker at destination. Deleted once testing is done.
    var markerOptions = {
      icon: "stop.png",
      animation: google.maps.Animation.DROP,
      map: map,
      position: destination,
      title: "Destination",
      visible: true
    }
    var currenPositionMarker = new google.maps.Marker(markerOptions);

    drawCircle(destination);
  }
  else {
    alert("Geocoder failed for the following reason: " + status);
  }
}

// takes as input a google.maps.latLng object
function drawCircle(latlng) {
  var circleOptions = {
    center: latlng,
    clickable: false,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    map: map,
    radius: 804.67200,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2
  }
  var circle = new google.maps.Circle(circleOptions);
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

