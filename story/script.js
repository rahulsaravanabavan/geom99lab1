// The whole document refer the google maps api platform reference
//"https://developers.google.com/maps"
// Map options
// declaring the map variables and direction services to get the direction and the route.
let map, directionsRenderers, directionsService;
async function initMap() {
  // initializes an empty array for direction renderers which later used in for loop to repeat the routes process
  directionsRenderers = [];
  directionsService = new google.maps.DirectionsService();
  // importing the map library from the google maps
  const { Map } = await google.maps.importLibrary("maps");
  await google.maps.importLibrary('marker');
  // creating a new map fro the pull request from the element ID map from html page
  map = new Map(document.getElementById("map"), {
    center: { lat: 43.67719551344359, lng: -79.6338072997999 },
    zoom: 3,
    // the map UI has been disabled and the gesture has been set to greedy so that cntrl for the zoom is opted out
    gestureHandling: "greedy",
    zoomControl: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true,
    // The features such as poi is disabled as the user zooms in or out the pois for the buisness is set to off so that the map looks good.
    styles: [
      // Repeat this object for each feature.
      {
        featureType: "poi.business",
        stylers: [{ visibility: "off" }],
      },
    ],
  });
// Create an array of alphabetical characters used to label the markers.
  const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const positions = [
    { lat: 43.67719551344359, lng: -79.6338072997999 },
    { lat: 43.88080106697079, lng: -78.94097671624047 },
    { lat: 43.944873221407086, lng: -78.87454533954678 },
    { lat: 44.341137805304086, lng: -78.74138473526659 },
    { lat: 44.34561795334159, lng: -78.73814514521302 },
  ];
  const markers = positions.map((location, i) => {
    return new google.maps.Marker({
      position: location,
      label: labels[i % labels.length],
    });
  });
  // declaring the constant routes with the lat lng from the positions to get routes on that lat long
  const routes = [
    { origin: positions[0], destination: positions[1] },
    { origin: positions[1], destination: positions[2] },
    { origin: positions[2], destination: positions[3] },
    { origin: positions[3], destination: positions[4] },
  ];
  // iterating through each routes to display each route in the console
  for (let i = 0; i < routes.length; i++) {
    const route = routes[i];
    const renderer = new google.maps.DirectionsRenderer({ map });
    const request = {
      origin: route.origin,
      destination: route.destination,
      travelMode: "DRIVING",
    };
    // getting the direction service request
    directionsService.route(request, function (response, status) {
      if (status === 'OK') {
        renderer.setDirections(response);
      }
    });
  }
  // getting the flight coordinates for assigning the poly line features
  const flight = [
    {lat:12.981992129551125, lng: 80.1604238802115, name:"Chennai International Airport"},
    {lat:24.44200405951458, lng: 54.64996481014897,  name:"Abu Dhabi International Airport"},
    {lat:43.67719551344359, lng: -79.6338072997999,  name:"Toronto International Airport"}
  ];
  // declaring the markers and their info tabs associated with it
  var flightMarker = new google.maps.Marker({
    position: flight[0],
    map: map,
    icon: 'https://i.ibb.co/r0rtVBj/airplane.png'
  });
  // declaring the flight path color as black with polyline feature
  var flightPath = new google.maps.Polyline({
    path: flight,
    geodesic: true,
    strokeColor: '#000000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });
  flightPath.setMap(map);
    // Add popup text box to airport markers
    // https://developers.google.com/maps/documentation/javascript/examples/overlay-popup
    // icon picture from "https://icons8.com/icons/set/airport"
    flight.forEach(function(coordinate) {
      var airportMarker = new google.maps.Marker({
        position: coordinate,
        map: map,
        title: coordinate.name,
        animation: google.maps.Animation.DROP,
        icon: './airport-tower.png'
      });
  });
}
initMap();
