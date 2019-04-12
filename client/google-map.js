var map;
var markers = [];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -6.3088,
            lng: 106.8456
        },
        zoom: 14
    });


    // This event listener will call addMarker() when the map is clicked.
    map.addListener('click', function (event) {
        deleteMarkers()
        addMarker(event.latLng);

        let lat = event.latLng.lat();
        let lng = event.latLng.lng();

        var geocoder = new google.maps.Geocoder;
        var infowindow = new google.maps.InfoWindow;

        document.getElementById('latmap').value = event.latLng.lat();
        document.getElementById('lngmap').value = event.latLng.lng();

        geocodeLatLng(geocoder, map, infowindow,lat,lng)
    });
}

function geocodeLatLng(geocoder, map, infowindow,lat,lng) {
    //var input = document.getElementById('latlng').value;

    var latlng = {
        lat: lat,
        lng: lng
    };
    geocoder.geocode({
        'location': latlng
    }, function (results, status) {
        if (status === 'OK') {
            if (results[0]) {
                map.setZoom(17);
            
                var marker = new google.maps.Marker({
                    position: latlng,
                    map: map
                });
                markers.push(marker);
                infowindow.setContent(results[0].formatted_address);
                document.getElementById('location').value = results[0].formatted_address

                infowindow.open(map, marker);
            } else {
                window.alert('No results found');
            }
        } else {
            window.alert('Geocoder failed due to: ' + status);
        }
    });
}


// Adds a marker to the map and push to the array.
function addMarker(location) {
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
    markers.push(marker);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
    setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    clearMarkers();
    markers = [];
}