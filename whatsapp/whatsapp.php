<?php  
	// Must sleep for at least 1 second, otherwise script will fail
	sleep(1);
	
	echo "<script>";		
	// Check if Android
	echo "var isAndroid = navigator.userAgent.toLowerCase().indexOf(\"android\") > -1;\n";
	// Check protocol
	echo "var proto = ('https:' == document.location.protocol ? 'https://' : 'http://');";		
	echo "var now = new Date().valueOf();\n";
	// Set Timeout - If still on page because apps not installed, launch app download page
	echo "setTimeout(function () {\n";				
	echo "if (new Date().valueOf() - now > 200) return;\n";		
	echo "if (isAndroid) {\n";
	echo "window.location = proto + \"play.google.com/store/apps/details?id=com.whatsapp\";\n";
	echo "} else {\n";
	echo "window.location = proto + \"itunes.apple.com/us/app/whatsapp-messenger/id310633997\";\n";
	echo "}\n";		
	echo "}, 100);\n";
	// Try to launch app
	if(isset($_GET["sms"])){ echo "window.location.href = 'whatsapp://send?text=" . rawurlencode($_GET["sms"]) . "';\n"; };
	echo "</script>";
	
	exit;	
?>