// Add Necessary Base Classes
define(['comp/graphicComp', 'utils/domUtils', 'utils/objectUtils'],
	// WhatsApp Social Media Button Class
    function(graphicComp, domUtils, objectUtils) 
    {
    	
    	'use strict';
    	
    	//=================================================
		// Variables
		//-------------------------------------------------
		var scriptName		= "whatsapp";
		var scriptVersion	= "0.0.1";
		var lastModified	= "2015-12-16";
	
		var templateVersion = "1.0.0";
		var isDebug = true;
		
		// Check for Mobile
        var mobile = detectMobile();
        // Determine whether site is using Secure Protocol
		var proto = ('https:' == document.location.protocol ? 'https://' : 'http://');		
		
		//-------------------------------------------------
		// Define MarkupTemplates
		//=================================================
        var _templates = {
        	// Define Image Template
            whatsAppButton: '<div style="width: <%=width %>; height: <%=height %>; <%=styles %> background: url(<%=image %>); background-size: cover; cursor: pointer;"></div>'
        };
        
        // Instantiate Class
        function WhatsAppComp(properties) { graphicComp.call(this, properties); };
		
		// Extend Class to Grapic Component
        WhatsAppComp.prototype = new graphicComp();
		
        WhatsAppComp.prototype.internalDraw = function() 
    	{
            graphicComp.prototype.internalDraw.call(this);
            // Set up the WhatsApp button 
            prepareWhatsApp.call(this);
		};
		
		// Define Input Schema
        WhatsAppComp.getInputSchema = function(){ return WhatsAppComp.inputSchema; };
		// Update Input Schema
        WhatsAppComp.inputSchema = objectUtils.create(graphicComp.inputSchema,
    	{
        	// Define X Position
            buttonStyles: 'string',            
            // Define Parameter for Image
            buttonImage: 'string',
            // Define Parameter for Container Div
            customImage: 'string',
            // Define Parameter for WhatsApp Message
            whatsAppMessage: 'string',
            // Define Parameter for WhatsApp Link
            whatsAppLink: 'string',
            // Define Parameter for WhatsApp Email Subject
            emailAlternative: 'string'
		});
		
		// Method to Build Templates
        function buildTemplate(str, data)
    	{
        	// Replace vars in template string with var value
            return str.replace(/<%=.+? %>/g, function(token){
            	// Update Value
                var key = token.substring(3, token.length-3);
                // Return new value
                return data[key];
            });
        }
        
        // Check for mobile devices        	
        function detectMobile() 
    	{
			if( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/Windows Phone/i)){
				return true;
			} else { return false; }
		}
        
        function prepareWhatsApp() 
    	{	
    		// Only Place WhatsApp Icon if on Mobile or Email Alternative is defined
        	if (mobile || this.prop.emailAlternative != undefined) 
        	{  
	        	// Check if using Custom Image
	        	if (this.prop.buttonImage === 3) 
	        	{ 
	        		// Set Image to Custom Image Path
	        		this.prop.buttonImage = this.prop.customImage; 
	        	} 
	        	else if (this.prop.buttonImage === 1) 
	        	{ 
	        		// Set Default Image 1
		        	this.prop.buttonImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAIAAABLixI0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABg1JREFUeNpcVWtsVEUUPjN37t27u+12+6LbBy1tqVBAIlAIPjAoETUq4AONhJcEYwQRFRUJgj8U30H5pUFQNIoYCSqIiRrEGDECUmmhtFToQlu6paVlt7t7d++98/DcYjA62ezuzJz5zne+OXMOUUoBQAay++QvrdAhQEhQBP4zcKr+/esNBYoCoUCroXwOnZkPIW8PsS7CwDrxbquKhiDIgJF/IYgGGh4Uw+h4Unn/5VVkDiIJ6TIY8SpbXQeVJKOyT/LXjsiWqXQ8biMvNexdB91S2QF12QFHebDoFoIkUARhjVAXDQEYaMiuSbWPhMhWtpEdFEebRPskMsaRLgINc2E2OFF1wQf6aFJVT2tGkhIH+BnZ2aaiHbLLR4wIKVKeMi5iXQt1x1Xb1/In1ixPG5IBIeifDgd1UV1KQ+ZWbdqj+gPFJN9AisNDasoGu1m0b+W7W/iZChoJgIlhUuA5KtDKoywrbSqoS91hOWmX6rWV/ZL5+Gx2Y0pZnzv7T8gzaWVRQgtI3nQ68Xb9pu3axDfsD3e6+2tphR9MB1wG1FYOk0pI+Y+iAxCPy8QW/7oZbAqivGN/Yim7iIR9YEiQSHavOviBvXuTf/Va3zKf0nc4X9XTWrx3PC0YpxJ/lBCS43cP71ttLJyhT/kou2dl8pU4T5apohIoDENOGHKroLSeVHfw7oeSz54SHU+Zi64jY8/zC7rSuORIiAohuOB4R318oI5ULjHnNfHTzyc310HVZ8E3l/jmnnd7XMnxY8msLd2J5BpMwaeTryGd9f7HbOmkpSWVFx2VSkrBlYR+d/AufSZqvDm9I86HngksnmpMWGDeXU3KLzi9RCikzrk7xJP1pOa007Er810dq5pMx513YgQlUGIYS8q0SAdV4Dbj+kGZaMq2VUJkLKvx7g7kOK02LoY8I4XuFVcex3yV92PmNzSYrk+0ZMYVLhKjUnhWKE0BhMI0t5WfVUKhnx8sz7TN6diZ3FdOIojqCg+FSmoLO6DMfj6ABuiSSmKhAKgXRojDEQ4uYfoN8DgmbRkp3jG0J8q7y7VIrVZ5LHMSFxM81Z7t6HR6kB2RJCOyiIUvARllpePFKJRChpqkaIp7VawMpzkQQOePXdxoUPZlyZa7zJk/DB28hlVuCK8sIYWX3MsI5FMG2sd4n80dzFAuPb04Hg5CoMftbXfOVWsjg9LstGO1rLIxc2ppbB063Bl5+9PI5pfyVy0L3f9N6XsNxoTj6cZRWhliHcmcQFymKBeIhWAeJEH4XclvQ1rwnuAt/e4AOhjDRv2c+v2OruWHrMaHQ3NGG5V4OEDNfvcSRrwgdw5OD6R+y4MgAiklKUrPOceXFKFFe+MHhmRqRcHCEMmLuX06sLF6TacTe6Br1X2dT7w/+PmuxP57u1bu6f94ecGKmwKTdya+bbZaI7TYljbKzvAWvbxH+SX3Ez+WkeNW89nUn4wVD2qJElY4mlVYxD5iNR1K/dHHB8GOzi5atLX85fPOhRd63hpBCzEsZCMM5OVlrKCK9Ni9DeYEHzX2JX66JXjDtopN80Kz+tzBw6mmFqvdcjOWyJZqxS9WvP599Yd97sD8c6swbwtp2BZZTD1EZJiqGC1OssKeHrgOa86msucMYuZQc3H+3PUlPT8OHep2e3XCxpl1N+c0FGjhRqtl4bk1Z53O8WZdVjhYGh3v5Simg2ELN+4mRrLIjGBDtxM7mm4+mDraaJ2clTv9kcL588N3MqJh6jnKbc9Gt/a/sTdxwAW33hjt8QDJiC/DLU1Rsq3vi+XRtWOC9WHqL9Dy/7KjXfj6CPFTMyMyIS2nwijN10JY8zDebjeGb6hCjwSoH1cwaSkhPho4ljy8oXwNwZhvPvXgiVTjuNC0mNPrJ2YhC2tAh7sRwSp4mQ959RJIUAvka3k+quMtYcXCXSyQlOitqWOFRunh8Xu9PtSRPTe3bWlLujXXGEGIjtpd7TSEUMRFmt47x5AA0/FKx/MenFSOw+MjjMg3Y7c35EwiV/rjJZ7Y1vvxr6lm7BGeQ/hfh/z/wIKOxNHNFP+YZZGFNb5yXPxbgAEAUOW3CQt5oH8AAAAASUVORK5CYII=';
	        	} 
	        	else if (this.prop.buttonImage === 2) 
	        	{ 
	        		// Set Default Image 2
		        	this.prop.buttonImage = 'data:image/png;base64,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';
	        	}
	        	
	        	// Build WhatsApp Button and place on page
	            this.div.innerHTML = buildTemplate.call(this, _templates.whatsAppButton, { image: this.prop.buttonImage, width: this.prop.width, height: this.prop.height, styles: this.prop.buttonStyles });
	        	// Listen for Click Event to handle WhatsApp Action
	            domUtils.bindEvent(this.div, 'click', function() { loadWhatsApp.call(this); }.bind(this));
			}
			else 
			{
				// Desktop Button not needed, hide div
				this.div.style.display = 'none';
			}
		}
        
        function loadWhatsApp() 
    	{
        	// Check if on mobile Device
        	if (mobile) 
        	{
        		// Tracking
				EB.userActionCounter('WhatsApp Button - Loading WhatsApp');
				// Open window to php proxy service
        		window.open(proto + 'origin.demo.sizmek.com/blocks/whatsapp/test/whatsapp/whatsapp.php?sms=' + this.prop.whatsAppMessage + encodeURIComponent('\n' + this.prop.whatsAppLink));
			} 
			else if (this.prop.emailAlternative != undefined) 
			{
				// Tracking
				EB.userActionCounter('WhatsApp Button - Loading Email');
				// Open Email Alternative for Desktop
				window.open("mailto:?Subject=" + this.prop.emailAlternative);
			} 
		
		}
        
		// Return WhatsApp Component
        return WhatsAppComp;
    }
);
