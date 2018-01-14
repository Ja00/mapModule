const DEFAULT_ZOOM = 10;
var directionsService = new google.maps.DirectionsService();
var directionsDisplay;
var currentTime;
var watchID = null;

$(() => {
	currentTime = new Date();
	$('#test1').text(currentTime + ' when I call init()');
	if(navigator.geolocation) {
		var optn = {
			enableHighAccuracy: true,
			timeout: Infinity,
			maximumAge: 0
		};
		currentTime = new Date();
		$('#test2').text(currentTime + ' before I call getCurPo()');
		navigator.geolocation.getCurrentPosition(success, fail,optn);
	} else {
		$('#map').html('<h1>Sorry! HTML5 not Supported!!!</h1>');
	}

});

// const success = position => {
// 	console.log(position.coords.latitude);
// 	console.log(position.coords.longitude);
// }

const success = position => {
	currentTime = new Date();
	$('#test3').text(currentTime + ' when I call success()');
	var googleLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	var mkrOptn = {
		icon: {
				url: './assets/icon_restaurant.png',
				scaledSize: new google.maps.Size(25,30)
			}
	}
	
	directionsDisplay = new google.maps.DirectionsRenderer({markerOptions: mkrOptn});
	var divMap = $('#map')[0];
	var option = {
		zoom: DEFAULT_ZOOM,
		center : googleLatLng
	}
	var map = new google.maps.Map(divMap, option);

	addMarker(map, googleLatLng, "J's Position!!");

	directionsDisplay.setMap(map);
	calRoute(position);

	watchID = navigator.geolocation.watchPosition(calRoute, fail);

	$('#btn').click(() => {
		if(watchID) {
			navigator.geolocation.clearWatch(watchID);
			watchID = null;
			return false;
		}
	});
	
}


const addMarker = (map, position, title) => {
	currentTime = new Date();
	$('#test4').text(currentTime + ' when I call addMerker()');
	var mkrOptn = {
		position: position,
		map: map,
		title: title,
		animation: google.maps.Animation.DROP,
		icon: {
			url: './assets/icon_restaurant.png',
			scaledSize: new google.maps.Size(25,30)
		}
	};

	var marker = new google.maps.Marker(mkrOptn);

}

const fail = () => {
	console.log('fail...')
}

const calRoute = (ori) => {
	var request = {
		origin: new google.maps.LatLng(ori.coords.latitude, ori.coords.longitude),
		destination: {
			lat: 37.4273101,
			lng: -121.9171428
		},
		travelMode: 'DRIVING'
	};
	console.log('marker 1');
	directionsService.route(request, function(result, status) {
		if(status == 'OK') {
			console.log('marker 2');
			// console.log("travel time: ");
			// console.log(result.routes[0].legs[0].duration.text);
			console.log(result);
			var time = result.routes[0].legs[0].duration.text;
			directionsDisplay.setDirections(result);
			$('#time').text('It takes ' + time + ' to get to store');
		}
	});

}

