$(document).ready(function () {

    console.log("in contat-us")
    var defaultLat = $('#latitude').val() == '' ? 24.8614622 : $('#latitude').val();
    var defaultLng = $('#longitude').val() == '' ? 67.00993879999999 : $('#longitude').val();


    var defaultPosition = new google.maps.LatLng(defaultLat, defaultLng);
    var mapOptions = {center: defaultPosition, zoom: 12};
    var geocoding = new google.maps.Geocoder();

    var current_map_canvas_id = $('.map-canvas').prop("id");
    var mp = new google.maps.Map(document.getElementById(current_map_canvas_id), mapOptions);
    mp["marker"] = [];

    updateLatLngForTextFieldsFor(mp, defaultLat, defaultLng, false);

    google.maps.event.addListener(mp, 'click', function (e) {

        updateLatLngForTextFieldsFor(mp, e.latLng.lat(), e.latLng.lng(), true);
    });



    $('#address').on('change blur', function (event) {

        updateMap(geocoding, mp);

    });


});

function updateMap(geocoding,mp){

    var address = $('#address').val();

    codeAddress(geocoding, address, mp);


}

function updateLatLngForTextFieldsFor(map, lat, lng, forceUpdate) {
    var currentLat = $('#latitude').val();
    var currentLng = $('#longitude').val();

    if ((currentLng == "" && currentLat == "") || forceUpdate) {
        $('#latitude').val(lat);
        $('#longitude').val(lng);
    }


    var marker = map["marker"];


    if (!(marker instanceof google.maps.Marker)) {
        if ((currentLng == "" && currentLat == "") || forceUpdate)
            placeNewMarker(new google.maps.LatLng(lat, lng), map);
        else
            placeNewMarker(new google.maps.LatLng(currentLat, currentLng), map);
    }
    else {
        marker.setPosition(new google.maps.LatLng(lat, lng));
    }

}


function placeNewMarker(position, map) {
    var marker = new google.maps.Marker({
        position: position,
        map: map
    });

    map["marker"] = marker;

}


// GEOCODING FUNCTIONS

function codeAddress(geocoding, address, map) {


    if (address.length > 0) {

        geocoding.geocode({'address': address}, function (results, status) {

            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);


                $('#longitude').val(results[0].geometry.location.lng())
                $('#latitude').val(results[0].geometry.location.lat())

                var marker = map["marker"];
                marker.setPosition(results[0].geometry.location);
            } else {
                console.log("Geocode was not successful for the following reason: " + status);
            }
        });
    } else {
        console.log("Search field can't be blank");
    }
}

$(document).ready(function () {
    $('#map-button').on('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
//        codeAddress(geocoding);
    });


});

