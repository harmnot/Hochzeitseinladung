function initMap() {
    var markers = []

    var myLatlng = {
        lat: -6.2088,
        lng: 106.8456
    };

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: myLatlng
    });

    function addMarker(location) {
        var marker = new google.maps.Marker({
            position: location,
            map: map
        });
        markers.push(marker);
    }

    map.addListener('click', function (event) {
        deleteMarkers()
        addMarker(event.latLng);

        document.getElementById('latmap').value = event.latLng.lat()
        document.getElementById('lngmap').value = event.latLng.lng()

        var geocoder = new google.maps.Geocoder;
        var infowindow = new google.maps.InfoWindow;

        geocodeLatLng(geocoder, map, infowindow, event.latLng.lat(),event.latLng.lng());

    });

    function geocodeLatLng(geocoder, map, infowindow,lat,lng) {
        console.log(lat,lng)
        //var input = document.getElementById('latlng').value;

        var latlng = {
            lat: parseFloat(lat),
            lng: parseFloat(lng)
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
                    document.getElementById('location').value = results[0].formatted_address
                    infowindow.setContent(results[0].formatted_address);
                    infowindow.open(map, marker);
                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }
        });
    }

    function deleteMarkers() {
        clearMarkers();
        markers = [];
    }

    function clearMarkers() {
        setMapOnAll(null);
    }

    function showMarkers() {
        setMapOnAll(map);
    }

    function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }

}