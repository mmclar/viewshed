
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
