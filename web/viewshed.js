
var ge;

google.load("earth", "1");

function init() {
  google.earth.createInstance('map3d', initCallback);
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
  
}

function go(){
	$.ajax({
		type: "POST",
		dataType: "json",
		url: "proxy.php?url=http://www.phillyhistory.org/PhotoArchive/geocode.ashx",
		data: {
			address: '626 s 16th st'
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
			
			$('#results').html(
				'2272: (' + pointSource.x + ', ' + pointSource.y + ')' + '<br />' +
				'4326: (' + pointDest.x + ', ' + pointDest.y + ')'
			);
			
			var view = ge.getView();
			var camera = view.copyAsCamera(ge.ALTITUDE_RELATIVE_TO_GROUND);
			camera.setLatitude(pointDest.y);
			camera.setLongitude(pointDest.x);
			camera.setAltitude(20);
			ge.getView().setAbstractView(camera);
			
			setTimeout(
				function(){
					camera.setTilt(100);
					ge.getView().setAbstractView(camera);
				},
				3000
			);
		}
	});

}