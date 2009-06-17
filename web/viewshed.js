var ge;
var debug = true;

var roofHeight;
var cam = {
	lat: 0,
	lon: 0,
	altitude: 0,
	heading: 0,
	tilt: 90,
	go: function(){
		var view = ge.getView();
		var camera = view.copyAsCamera(ge.ALTITUDE_RELATIVE_TO_GROUND);
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
		setText('txtAddr', '737 Spruce St');
		setText('txtAlt', 100);
	}
}

function initCallback(pluginInstance) {
	ge = pluginInstance;
	ge.getWindow().setVisibility(true);
	
	// add a navigation control
	ge.getNavigationControl().setVisibility(ge.VISIBILITY_AUTO);
	
	// add some layers
	ge.getLayerRoot().enableLayerById(ge.LAYER_BORDERS, true);
	ge.getLayerRoot().enableLayerById(ge.LAYER_ROADS, true);
	ge.getLayerRoot().enableLayerById(ge.LAYER_BUILDINGS, true);
	
	google.earth.addEventListener(ge.getGlobe(), 'click', viewClick);
}

function flyTo(address, altitude){
	$.ajax({
		type: "POST",
		dataType: "json",
		url: "proxy.php?url=http://www.phillyhistory.org/PhotoArchive/geocode.ashx",
		data: {
			address: address
		},
		success: function(data){
			// {"totalMatches":1,"matches":[{"location":"737 Spruce St","xcoord":"2696192","ycoord":"233855.999999931"}]}
			var x = data.matches[0].xcoord, y = data.matches[0].ycoord;
			
			Proj4js.defs["EPSG:2272"] = "+proj=lcc +lat_1=40.96666666666667 +lat_2=39.93333333333333 +lat_0=39.33333333333334 +lon_0=-77.75 +x_0=600000 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs";
			var source = new Proj4js.Proj('EPSG:2272');
			var dest = new Proj4js.Proj('EPSG:4326');
			var pointSource = new Proj4js.Point(+x,+y);
			var pointDest = new Proj4js.Point(+x,+y);
			Proj4js.transform(source, dest, pointDest);
			
			if (debug) {
				$('#results').html(
					'2272: (' + pointSource.x + ', ' + pointSource.y + ')' + '<br />' +
					'4326: (' + pointDest.x + ', ' + pointDest.y + ')'
				);
			}
			
			cam.altitude = +altitude;
			cam.lat = pointDest.y;
			cam.lon = pointDest.x;
			cam.heading = 0;
			cam.tilt = 0;
			cam.go();
		}
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
