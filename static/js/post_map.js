let map, infoWindow;
// Initialize and add the map
function initMap() {
  // The map, centered specific location. Need to custom to ssers CurrentPosition
  map = new google.maps.Map(document.getElementById("post_map"), {
    zoom: 13,
    center: {lat: -34.901357, lng: -56.189205},
  });
  a = -34.901357
  b = -56.189205
  infoWindow = new google.maps.InfoWindow();
    let marker = new google.maps.Marker({
    position: new google.maps.LatLng(a , b),
    map: map,
    draggable: true,
    });
    //Create markers based on testing locations.
  const locationButton = document.createElement("button");
  locationButton.textContent = "Selecciona ubicación actual";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          marker.setPosition(pos);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
        
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });


    //Show lat/lng on console
    google.maps.event.addListener(marker,'drag', function(event){
      $("#postLat").val(event.latLng.lat().toFixed(6));
      $("#postLng").val(event.latLng.lng().toFixed(6));
      map.panTo(event.latLng);
    });
    
      // markers can only be keyboard focusable when they have click listeners
      // open info window when marker is clicked
};
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: El servicio de Geolocalización falló."
      : "Error: El navegador no soporta Geolocalización."
  );
  infoWindow.open(map);
}