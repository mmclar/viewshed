<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title>Google Earth Viewshed Estimate</title>
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js"></script>
	<script src="lib/proj4js-combined.js"></script>
	<script src="http://openlayers.org/api/OpenLayers.js"></script>
    <script src="http://www.google.com/jsapi?key=ABQIAAAA1XbMiDxx_BTCY2_FkPh06RRaGTYH6UMl8mADNa0YKuWNNa8VNxQEerTAUcfkyrr6OwBovxn7TDAH5Q"></script>
	<script src="util.js"></script>
    <script src="viewshed.js"></script>
  </head>
  <body onload="init()" style="font-family: arial, sans-serif; font-size: 13px; border: 0;">
    <div id="map3d" style="width: 600px; height: 300px; float: left;"></div>
	<div id="controls" style="float: left; padding-left: 20px; width: 500px">
		<div>Step 1: Approximate<br />
			Address: <input type="text" id="txtAddr" /><br />
			Height (meters): <input type="text" id="txtAlt" />
			<input type="button" value="Fly to" onclick="flyTo(tVal('txtAddr'), tVal('txtAlt'));" /><br />
			<span id="results">Point location</span><br /><br />
		</div>
		<div>Step 2: Specify<br />
			Click on a building surface to view from that point.<br />
			Point: <span id="standingPoint"></span><br />
			Roof Height: <span id="standingAltitude"></span> meters<br /><br />
		</div>
		<div>Step 3: Adjust
			<div>
				Height above roof
				<input type="button" value="+" id="btnAddAltUp" onclick="modParam('txtAddAlt', .5);"/>
				<input type="text" style="width: 50px;" id="txtAddAlt" value="2" />
				<input type="button" value="-" id="btnAddAltDown" onclick="modParam('txtAddAlt', -.5);" /> meters
			</div>
			<div>
				Pitch
				<input type="button" value="+" id="btnTiltUp" onclick="modParam('txtTilt', 10);" />
				<input type="text" style="width: 50px;" id="txtTilt" value="90" />
				<input type="button" value="-" id="btnTiltDown" onclick="modParam('txtTilt', -10);" />
			</div>
			<div>
				Heading
				<input type="button" value="+" id="btnHeadUp" onclick="modParam('txtHead', 10);" />
				<input type="text" style="width: 50px;" id="txtHead" value="0" />
				<input type="button" value="-" id="btnHeadDown" onclick="modParam('txtHead', -10);" />
			</div>
			<div>
				<input type="button" value="Update" id="btnUpdate" />
			</div>
		</div>
	</div>
    <br>
  </body>
 </html>