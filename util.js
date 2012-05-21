window.onload = init;

function init() {

  var positionOptions = {
    enableHighAccuracy: true,
    timeout: 10000 // Wait a max of 10 seconds before timing out.
  };
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(makeMap, 
                                             geolocationErrorHandler, 
                                             positionOptions);
  }
  else {
    alert("I'm sorry, but geolocation is not supported by this browser.")
  }
}


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

function geolocationErrorHandler(error) {

  // Message to the user explaining why the application has not started.
  var errorMsg;

  switch(error.code) {
    case error.PERMISSION_DENIED:
      errorMsg = "You can't use the appliction if you declined to share your location.";
      break;
    case error.POSITION_UNAVAILABLE:
      errorMsg = "Unknown error while getting your location.";
      break;
    case error.TIMEOUT:
      errorMsg = "Timed out while trying to get your location.";
      break;
    default:
      errorMsg = "Uknown error.";
  }

  alert (errorMsg + " Reload the page to try again.");
}

function displayPosition(position) {

}
