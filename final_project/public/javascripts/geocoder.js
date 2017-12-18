var map;
var geocoder;

function initMap() {
    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById('map-canvas'), {
        center: {lat: 41.083946999999, lng: -74.176609},
        zoom: 7
    });
}

$(document).ready(function() {
    initApplication();
});

function initApplication() {
    addressOnClickEvent();
}

function getGeoLocation() {
    var address = $('#address').val();
    geocoder.geocode( {'address': address}, function(results, status) {
        if (status == 'OK') {
            var latLngData = {
                latitude: results[0].geometry.location.lat(),
                longitude: results[0].geometry.location.lng()
            };

            // ping to map
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });

            // if($('.used-addresses').css('display') == 'none') {
            //     $('.used-addresses').css('display', 'inline-block');
            // }

            // output human readable address
            var formattedAddress = results[0].formatted_address;
            $('<li>').addClass('single-address')
                    .text(formattedAddress)
                    .appendTo('ul')
                    .data("coordinates", latLngData);

            // clear the input element
            $('#address').val("");
        }
        else {
            alert("Geocode failed -> reason: " + status);
        }
    });
}

function addressOnClickEvent() {
    $('body').on('click', 'li', function(e) {
        var latLngData = $(this).data("coordinates");
        map.setCenter(new google.maps.LatLng({lat: latLngData.latitude, lng: latLngData.longitude}));
    });
}