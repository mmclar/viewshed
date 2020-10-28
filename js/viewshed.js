
const viewShed = {
	init: () => {
		var s = $('form.approximate');
		s.on('submit', (e) => {
		    e.preventDefault();
		    viewShed.flyTo($('#txtAddr').val(), $('#txtAlt').val());
		});

		viewShed.setupClickHandler();
	},

	setAltitude: (altitude) => {
		const clone = Cesium.Cartographic.clone(viewer.camera.positionCartographic);
		clone.height = altitude;
		const destination = Cesium.Cartographic.toCartesian(clone);
		viewer.camera.position = destination;
	},

	setPitch: (pitch) => {
		viewer.camera.setView({orientation: {
			heading: viewer.camera.heading,
			pitch: Cesium.Math.toRadians(pitch)
		}});
	},

	setHeading: (heading) => {
		viewer.camera.setView({orientation: {
			heading: Cesium.Math.toRadians(heading),
			pitch: viewer.camera.pitch
		}});
	},

	flyTo: (address, altitude) => {
		// Do the geocoding.
		viewer.geocoder.viewModel.searchText = address;
		viewer.geocoder.viewModel.search();

		// When the the camera is done moving, go to the specified altitude
		const flyDoneListener = () => {
			const couldRemove = viewer.camera.moveEnd.removeEventListener(flyDoneListener);
			if (!couldRemove) {
				alert('Could not remove.');
			}
			viewShed.setAltitude(altitude);
		};
		viewer.camera.moveEnd.addEventListener(flyDoneListener);
	},

	setupClickHandler: () => {
		viewer.screenSpaceEventHandler.setInputAction((movement) => {
			// Pick a new feature
			var pickedFeature = viewer.scene.pick(movement.position);
			if (!Cesium.defined(pickedFeature)) {
				clickHandler(movement);
			}
		}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
	}
};

$(viewShed.init);

function modParam(textId, delta, cb){
	field$ = $('#' + textId);
	field$.val(+field$.val() + delta);
	cb(field$.val());
}
/*
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


 */