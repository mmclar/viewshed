var ge;
var debug = true;
var $ = jQuery;
var roofHeight;
var cam = {
	lat: 0,
	lon: 0,
	altitude: 0,
	heading: 0,
	tilt: 90,
	go: function(){
		var view = ge.getView();
		var camera = view.copyAsCamera(ge.ALTITUDE_ABSOLUTE);
		camera.setLatitude(this.lat);
		camera.setLongitude(this.lon);
		camera.setAltitude(this.altitude);
		camera.setHeading(this.heading);
		camera.setTilt(this.tilt);
		ge.getView().setAbstractView(camera);
	}
}

google.load("earth", "1");

function init() {
	google.earth.createInstance('map3d', initCallback);
	if (debug) {
		setText('txtAddr', '737 Spruce St., Philadelphia, PA');
		setText('txtAlt', 100);
	}
}

function initCallback(pluginInstance) {
	ge = pluginInstance;
	ge.getWindow().setVisibility(true);
	
	ge.getLayerRoot().enableLayerById(ge.LAYER_BUILDINGS, true);
	
	google.earth.addEventListener(ge.getGlobe(), 'click', viewClick);
}

var geocoder = new GClientGeocoder();
function flyTo(address, altitude){
  geocoder.getLatLng(
    address,
    function(point){
      if (debug) {
				$('#results').html('gc response object: ' + point + '<br />');
      }

			cam.altitude = +altitude;
			cam.lon = point.x;
			cam.lat = point.y;
			cam.heading = 0;
			cam.tilt = 0;
			cam.go();
	});
}

function viewClick(evt){
	if (evt.getButton() != 0)
	return;
	
	// hit test and create new placemarks
	var point = ge.getView().hitTest(evt.getClientX(), ge.UNITS_PIXELS, evt.getClientY(), ge.UNITS_PIXELS, ge.HIT_TEST_BUILDINGS);
	if (point) {
		var lat = point.getLatitude(), 
			lon = point.getLongitude(),
			alt = point.getAltitude(); 
		$('#standingPoint').html("(" + lon + ", " + lat + ")");
		$('#standingAltitude').html(alt);
		
		cam.lat = lat;
		cam.lon = lon;
		roofHeight = alt;
		lookUpdate();
	}
}

function lookUpdate(){
	cam.altitude = roofHeight + +tVal('txtAddAlt');
	cam.tilt = +tVal('txtTilt');
	cam.heading = +tVal('txtHead');
	cam.go();
}

function modParam(textId, delta){
	$('#' + textId).val(+$('#' + textId).val() + delta);
	lookUpdate();
}
