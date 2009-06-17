<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title>Google Earth API Sample</title>
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js"></script>
	<script src="lib/proj4js-combined.js"></script>
	<script src="http://openlayers.org/api/OpenLayers.js"></script>
    <script src="http://www.google.com/jsapi?key=ABQIAAAA1XbMiDxx_BTCY2_FkPh06RRaGTYH6UMl8mADNa0YKuWNNa8VNxQEerTAUcfkyrr6OwBovxn7TDAH5Q"></script>
    <script src="viewshed.js"></script>
  </head>
  <body onload="init()" style="font-family: arial, sans-serif; font-size: 13px; border: 0;">
    <div id="map3d" style="width: 600px; height: 300px; float: left;"></div>
	<div id="controls" style="float: left; padding-left: 20px;">
		<div>Step 1: Approximate<br />
			<input type="button" value="Go" onclick="go();" /><br />
			<span id="results"></span>
		</div>
		<div>Step 2: Specify</div>
		<div>Step 3: Look Around</div>
	</div>
    <br>
  </body>
 </html>