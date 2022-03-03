// Initialize and add the map
function initMap() {
  function showLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
  }
    // The map, centered specific location. Need to custom to ssers CurrentPosition
      let map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: {lat: -34.901357, lng: -56.189205},
      });
      let infoWindow = new google.maps.InfoWindow({
        // To display content (usually text or images) in a popup window above the map
        content: "NOSENOSENOSE",
        disableAutoPan: true,
      });
    //Set icons
    const iconBase =
      "https://developers.google.com/maps/documentation/javascript/examples/full/images/";
    const icons = {
      info: {
        icon: iconBase + "parking_lot_maps.png",
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