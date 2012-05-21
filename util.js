window.onload = init;

/* Globals */
var map;
var currentPos;
var destination;

function init() {

  var geolocationOptions = {
    enableHighAccuracy: true,
    timeout: 10 * 1000 // Wait 10 seconds before timing out.
  };
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(createMap, 
                                             geolocationErrorHandler, 
                                             geolocationOptions); 
  }
  else {
    alert("I'm sorry, but for this application to work it will need an updated browser." +
          "\n\nTry again with the latest version of Google Chrome.");
  }
}


function createMap(position) {

  var mapOptions = {
    center: new google.maps.LatLng(position.coords.latitude, 
                                   position.coords.longitude),
    zoom: 18,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

}

/*
function makeMap(position) {

  // position.coords.accuracy;

  var mapOptions = {
    center: new google.maps.LatLng(position.coords.latitude, 
                                   position.coords.longitude),
    zoom: 18,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

  var markerOptions = {
    animation: google.maps.Animation.DROP,
    map: map,
    position: new google.maps.LatLng(position.coords.latitude,
                                     position.coords.longitude),
    title: "Current position",
    visible: true
  }

  var currentPositionMarker = new google.maps.Marker(markerOptions);
}

*/

/* Message explaining why the application has not started. */
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
