// Map Center Point
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        // Apply the map style array to the map.
        styles: styleArray,
        draggable: false,
        scrollwheel: false,
        center: {
            lat: 28.577561,
            lng: 77.154637
        }
    });

    setMarkers(map);
}

// Specify features and elements to define styles.
var styleArray = [{
    featureType: "all",
    stylers: [{
        saturation: -80
    }]
}, {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [{
        hue: "#00ffee"
    }, {
        saturation: 50
    }]
}, {
    featureType: "poi.business",
    elementType: "labels",
    stylers: [{
        visibility: "off"
    }]
}];

// Data for the markers consisting of a name, a LatLng and a zIndex for the
// order in which these markers should display on top of each other.
var beaches = [
    ['Uttrakhand', 30.618451, 79.562066, 7, '<h4>Ongoing Consultant</h4>Gonvindghat to Ghagarai and Ghagria to Hemkund For the UIPC/Government of Uttrakhand'],
    ['Purnagiri', 30.555550, 79.559851, 6, '<h4>Purnagiri Bi-Cable Ropeway</h4>1000 pph, Technological partner not decided yet'],
    ['Ralamandal Eco Park', 22.648734, 75.897540, 5, '<h4>Ongoing Consultant</h4>In collaboration with Innovest, at Indore'],
    ['Gulmarg Gondola', 34.045655, 74.384522, 4, '<h4>4 Seat Chairlift with Loading Carpet</h4>1000 persons per hour with Pomagalski, France'],
    ['Karni Mata', 24.566430, 73.685088, 3, '<h4>Karnimata Group Gondola</h4>200 persons per hour with Conveyor Ropeway Services Pvt Ltd, Kolkata'],
    ['Pawagadh Ropeway', 22.464827, 73.518899, 2, '<h4>Pawagadh Mono-Cable Detachable Ropeway</h4>1600 persons per hour with ROWEMMA AG, Switzerland'],
];

function setMarkers(map) {
    // Adds markers to the map.

    // Marker sizes are expressed as a Size of X,Y where the origin of the image
    // (0,0) is located in the top left of the image.

    // Origins, anchor positions and coordinates of the marker increase in the X
    // direction to the right and in the Y direction down.
    var image = {
        url: 'images/map_marker.png',
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(20, 32),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(10, 32)
    };

    var pinShadow = {
        url: 'http://chart.apis.google.com/chart?chst=d_map_pin_shadow',
        size: new google.maps.Size(40, 37),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(12, 35)
    };

    // Shapes define the clickable region of the icon. The type defines an HTML
    // <area> element 'poly' which traces out a polygon as a series of X,Y points.
    // The final coordinate closes the poly by connecting to the first coordinate.
    var shape = {
        coords: [1, 1, 1, 20, 18, 20, 18, 1],
        type: 'poly'
    };

    var infowindow = new google.maps.InfoWindow();

    for (var i = 0; i < beaches.length; i++) {
        var beach = beaches[i];
        var marker = new google.maps.Marker({
            position: {
                lat: beach[1],
                lng: beach[2]
            },
            map: map,
            shadow: pinShadow,
            icon: image,
            shape: shape,
            title: beach[0],
            zIndex: beach[3]
        });



        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infowindow.setContent(beaches[i][4]);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }
}

$(document).ready(function() {

    /**Smooth Scroll **/
    $(document).ready(function() {
        $('a[href*=#]').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var $target = $(this.hash);
                $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
                if ($target.length) {
                    var targetOffset = $target.offset().top;
                    $('html,body')
                        .animate({
                            scrollTop: targetOffset
                        }, 1000);
                    return false;
                }
            }
        });
    });

    /**Carousel Function **/
    $('.carousel').carousel();

    $('#custom_carousel').on('slide.bs.carousel', function(evt) {
        $('#custom_carousel .controls li.active').removeClass('active');
        $('#custom_carousel .controls li:eq(' + $(evt.relatedTarget).index() + ')').addClass('active');
    });


    /** Contact Form **/
    $('#contact-button').click(function() {
        $('#contact-form').attr('action', 'mailto: info@ropeway.in' +
            $('#InputEmail').val() + '&body=' + $('#InputPassword').val());
        $('#contact-form').submit();
    });

    /** Navigation active state **/
    $(".nav a").on("click", function() {
        $(".nav").find(".active").removeClass("active");
        $(this).parent().addClass("active");
    });

    /** Lettering.js **/
    $(".fancy_title").lettering();

});
