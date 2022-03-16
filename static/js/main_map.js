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
  let listofallposts = []
  let listDict = []
  fetch('https://encuentrame.org.xelar.tech/api/posts')
  .then(response => response.json())
  .then(data => {
    for (let obj in data){
      listDict = listDict.concat(data[obj])
      console.log("Checking list after each iteration in data")
      console.log(listDict)
    }
    for (let element in listDict) {
      let postLat = listDict[element].latitude
      let postLng = listDict[element].longitude
      let postLink = "https://encuentrame.org.xelar.tech/"+ listDict[element].id
      let postPhoto = '<a href="'+postLink+'"> <img src="/static/images/' + listDict[element].foto + '" width="200"> </a>'
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
      Object.assign(listDict[element], posit)
      listofallposts = listofallposts.concat(listDict[element])
    }
    console.log("Checking list outside loop")
    console.log(listofallposts)
      //Set icons
    const icons = {
      lostMarker: {
        icon: "https://raw.githubusercontent.com/ayrton-hbtn/EncuentraMe/main/static/img/lostmarker2.png",
        name: "Perdidos"
      },
      foundMarker: {
        icon: "https://raw.githubusercontent.com/ayrton-hbtn/EncuentraMe/main/static/img/foundmarker2.png",
        name: "Encontrados en la calle"
      }
    };

    //Create markers based on testing locations.
    for (let i = 0; i < listofallposts.length; i++) {
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
  })

};

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
  const legend = document.getElementById("legend");

  for (const key in icons) {
    const type = icons[key];
    const name = type.name;
    const icon = type.icon;
    const div = document.createElement("div");

    div.innerHTML = '<img src="' + icon + '"> ' + name;
    legend.appendChild(div);
  }

  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);
}