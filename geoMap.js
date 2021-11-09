let map, infoWindow;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644},
        zoom: 6,
    });
    infoWindow = new google.maps.infoWindow();

    const locationButton = document.createElement("button");

    locationButton.textContent = "Pan to current location";
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
                infoWindow.setContent("Location found");
                infoWindow.open(map);
                map.setCenter(pos);
            },
            () => {
                handleLocationError(true, infoWindow, map.getCenter());
            }
            );
        } else {
            handleLocationError(false, infoWindow, map.getCenter());
        }
    });    
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
            ? "Error: The geolocation service has failed."
            : "Error: Your browser does not support geolocation."
    );
    infoWindow.open(map);
}


