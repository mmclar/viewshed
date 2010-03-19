<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<?php 
	$google_key = '';
	$host = $_SERVER['HTTP_HOST'];
	if ($host == 'mmclar.dyndns.org'){
		$google_key = 'ABQIAAAAWkLoRyKMiEp-MzJSV6esWBT5w9XzsCNVR7bANPBewbwuhytdzRTbHQMYHV4jKNuPT69lZgyvPchayw';
	}
	else{
		$google_key = 'ABQIAAAAWkLoRyKMiEp-MzJSV6esWBT5w9XzsCNVR7bANPBewbwuhytdzRTbHQMYHV4jKNuPT69lZgyvPchayw';
	}
?>
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title>Google Earth Viewshed Estimate</title>
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js"></script>
	<script src="http://maps.google.com/maps?file=api&v=2&key=<?php echo $google_key; ?>&sensor=false" type="text/javascript"></script>
  <script src="http://www.google.com/jsapi?key=<?php echo $google_key; ?>"></script>
	<script src="util.js"></script>
  <script src="viewshed.js"></script>
  </head>
  <body onload="init()" style="font-family: arial, sans-serif; font-size: 13px; border: 0;">
  	<div id="map3d" style="width: 600px; height: 600px; float: left;"></div>
	<div id="controls" style="float: left; padding-left: 20px; width: 500px">
		<div><b>Approximate</b><br />
			<em>Enter an address to fly above the location.</em><br />
			Address: <input type="text" id="txtAddr" /><br />
			Height (meters): <input type="text" id="txtAlt" />
			<input type="button" value="Fly to" onclick="flyTo(tVal('txtAddr'), tVal('txtAlt'));" /><br />
			<span id="results">Point location</span><br /><br />
		</div>
		<div><b>Specify</b><br />
			<em>Click on a building surface to view from that point.</em><br />
			Point: <span id="standingPoint"></span><br />
			Roof Height: <span id="standingAltitude">?</span> meters<br /><br />
		</div>
		<div><b>Adjust</b><br />
			<em>Use these controls to control your vantage point.</em><br />
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
				<input type="button" value="<-" id="btnHeadUp" onclick="modParam('txtHead', -10);" />
				<input type="text" style="width: 50px;" id="txtHead" value="0" />
				<input type="button" value="->" id="btnHeadDown" onclick="modParam('txtHead', 10);" />
			</div>
			<div>
				<input type="button" value="Update" onclick="lookUpdate()" />
			</div>
		</div>
    <br />
    <div><b>About</b></div>
	  I put this together when I was looking for potential houses for purchase, to get an idea of the type of view they will have from the roof.  It is not perfect, but it does a pretty realistic job of estimating.  It has helped me skip looking at a few houses that had their views blocked by large nearby buildings.<p>
  Some things to do:
    <ul><li>switch to a more general geocoder</li><li>allow for location (NSEW) movement</li></ul>
    </div>
    <br>
  </body>
 </html>
