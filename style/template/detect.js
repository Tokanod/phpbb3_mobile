(function() {

	// Check if variable is set
	if (typeof(phpBBMobileStyle) != 'boolean' || typeof(phpBBMobileVar) != 'string')
	{
		return;
	}
	
	// Set viewport
	// document.write('<meta name="viewport" content="width=device-width, initial-scale=1.0"/>');
	
	// Add CSS
	document.write('<style> .mobileDeviceTest { float: left; } @media only screen and (max-device-width: 600px) { .mobileDeviceTest { float: right; } } </style>');

	// Check browser resolution
	document.addEventListener('DOMContentLoaded', function() {
	
		function redirect(mode)
		{
			try {
				var url = document.location.href;
				url = url + ((url.indexOf('?') > 0) ? '&' : '?') + phpBBMobileVar + '=' + mode;
				document.location.href = url;
			}
			catch (e) {}
		}
	
		// Create test item
		var testItem = document.createElement('div');
		testItem.className = 'mobileDeviceTest';
		testItem.style.display = 'none';
		document.body.appendChild(testItem);
		
		// Get computed style
		if (testItem.currentStyle)
		{
			var style = testItem.currentStyle('float');
		}
		else if (window.getComputedStyle)
		{
			var style = document.defaultView.getComputedStyle(testItem, null).getPropertyValue('float');
		}
		else
		{
			return;
		}

		switch (style)
		{
			case 'left':
				if (phpBBMobileStyle)
				{
					redirect('off');
				}
				break;
			case 'right':
				if (!phpBBMobileStyle)
				{
					redirect('on');
				}
		}

	}, false);

})();