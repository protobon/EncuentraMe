let map, infoWindow;
// Initialize and add the map
function initMap() {
  // The map, centered specific location. Need to custom to ssers CurrentPosition
  map = new google.maps.Map(document.getElementById("main_map"), {
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
  var listofallposts = []
  fetch('https://encuentrame.org.xelar.tech/api/posts')
  .then(response => response.json())
  .then(data => {
    for (let element in data){
      let postLat = data[element].latitude
      let postLng = data[element].longitude
      let postLink = "https://encuentrame.org.xelar.tech/"+ data[element].id
      let postPhoto = '<a href="'+postLink+'"> <img src="/static/images/' + data[element].foto + '" width="200"> </a>'
      latlng = new google.maps.LatLng(postLat , postLng)
      if (data[element].nombre) {
        postType = "lostMarker";
      } else {
        postType = "foundMarker";
      }
      let posit = {
        position: latlng,
        type: postType,
        content: postPhoto,
      }
      Object.assign(data[element], posit)
      listofallposts = listofallposts.concat(data[element])
    }
  })
      //Set icons
    const icons = {
      lostMarker: {
        icon: "https://raw.githubusercontent.com/ayrton-hbtn/EncuentraMe/main/static/img/lostmarker.png",
      },
      foundMarker: {
        icon: "https://raw.githubusercontent.com/ayrton-hbtn/EncuentraMe/main/static/img/foundmarker.png",
      }
    };

    //Create markers based on testing locations.
    for (let i = 0; i < listofallposts.length; i++) {
      console.log(listofallposts[i].position)
      const marker = new google.maps.Marker({
        position: listofallposts[i].position,
        icon: icons[listofallposts[i].type].icon,
        map: map,
      });
      // markers can only be keyboard focusable when they have click listeners
      // open info window when marker is clicked
      marker.addListener("click", () => {
        infoWindow.setContent(listofallposts[i].content);
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