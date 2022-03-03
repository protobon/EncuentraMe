let map, infoWindow;
// Initialize and add the map
function initMap() {
  // The map, centered specific location. Need to custom to ssers CurrentPosition
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: {lat: -34.901357, lng: -56.189205},
  });
  infoWindow = new google.maps.InfoWindow();
  // To display content (usually text or images) in a popup window above the map
  const locationButton = document.createElement("button");
  locationButton.textContent = "Selecciona ubicación actual";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
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
      //Set icons
      const iconBase =
      "https://www.gstatic.com/earth/images/stockicons/190201-2016-animal-paw_4x.png";
    const icons = {
      info: {
        icon: iconBase,
      },
    };
    // Add some locations for testing.
    const locations = [
      {
        position: new google.maps.LatLng(-34.901357, -56.189205),
        type: "info",
        content: "Perrito Marron"
      },
      {
        position: new google.maps.LatLng(-34.901357, -56.189215),
        type: "info",
        content: "Gatito Azul"
      },
      {
        position: new google.maps.LatLng(-34.915445, -56.159130),
        type: "info",
        content: "Cabra"
      },
      {
        position: new google.maps.LatLng(-34.915446, -56.159131),
        type: "info",
        content: "Caballo con alas"
      },
      {
        position: new google.maps.LatLng(-34.915447, -56.159132),
        type: "info",
        content: "Otro caballo con alas"
      },
      {
        position: new google.maps.LatLng(-34.884641, -56.161547),
        type: "info",
        content: "Este si es un perrito normal"
      },
      {
        position: new google.maps.LatLng(-34.853451, -56.103143),
        type: "info",
        content: "CatDog"
      },
    ];
    //Create markers based on testing locations.
    for (let i = 0; i < locations.length; i++) {
      const marker = new google.maps.Marker({
        position: locations[i].position,
        icon: icons[locations[i].type].icon,
        map: map,
      });
      // markers can only be keyboard focusable when they have click listeners
      // open info window when marker is clicked
      marker.addListener("click", () => {
        infoWindow.setContent(locations[i].content);
        infoWindow.open(map, marker);
      });
    };
};
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}
