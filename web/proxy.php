<?php

	/*
		By:		Matt Ford

		Purpose:	This is a PHP powered proxy script for XSS scripting
	*/

class phpProxy {
	public	$url 		= null; //request url
	public	$headers 	= null; //boolean headers
	public	$mimeType 	= null; //mimetype of response

	private	$session 	= null; //curl session
	public	$response 	= null; //curl response

	public function __construct($request) {
		$this->phpProxy($request);
	}

	public function phpProxy($request) {
		$this->url = trim($request["url"]);
		$this->headers = trim($request["headers"]);
		$this->mimeType = trim($request["mimeType"]);

		if ($this->url != "") {
			$this->initRequest();
		} else {}
	}

	private function initRequest() {
		$this->session = curl_init($this->url);

		if ($_SERVER["REQUEST_METHOD"] == "POST") {
			$postVars = array();;

			foreach ($_POST as $k => $v) {
				$postVars[] = $k . "=" . $v;
			}

			$postVars = implode("&", $postVars);

			curl_setopt ($this->session, CURLOPT_POST, true);
			curl_setopt ($this->session, CURLOPT_POSTFIELDS, $postVars);
		} else {}

		curl_setopt($this->session, CURLOPT_HEADER, ($this->headers == "true") ? true : false);
		curl_setopt($this->session, CURLOPT_FOLLOWLOCATION, true);
		curl_setopt($this->session, CURLOPT_RETURNTRANSFER, true);

		$this->response = curl_exec($this->session);

		if ($this->mimeType != "") {
			header("Content-Type: " . $this->mimeType);
		} else {}

		echo $this->response;
		curl_close($this->session);
	}
}

$phpProxy = new phpProxy($_REQUEST);
?>