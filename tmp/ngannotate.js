// TripAdvisor plugin code
var tripAdvisor = {

	// Client settings
	config: {
		key		: '68665bd4e562473884942d5db3a67a1e',
		client	: '237567',
		url		: 'http://api.tripadvisor.com/api/partner/2.0/location/'
	},
	
	// Initiate the function
	init: function(){
		var self = this;
		var obj = {
			key: self.config.key
		};
		self.getData(obj);
		
	},

	// Get the TripAdvisor data
	getData: function(obj){

		var self = this;

		// Build the url
		var url = self.config.url + self.config.client+'?key='+self.config.key;

		var request = new XMLHttpRequest();

		request.onload = function() {
		  if (request.status >= 200 && request.status < 400) {
		    // Success!
		    var data = JSON.parse(request.responseText);
			switch(data.code) {
				case 160:
					console.log(data.responseJson.error.message);
					break;
				case 150:
					console.log(data.responseJson.error.message);
					break;
				case 101:
					console.log(data.responseJson.error.message);
					break;
				case 120:
					console.log(data.responseJson.error.message);
					break;
				default:
				
					// Success, let's make use of this data
					self.renderData(data);
			}

		  } else {
		    // We reached our target server, but it returned an error
		  }
		};

		request.onerror = function() {
		  // There was a connection error of some sort
		  console.log('Sadly, there was an error while connecting to TripAdvisor.. Check the URL');
		};
		request.open('GET', url, true);
		request.send();

	},
	
	// Render the TripAdvisor data
	renderData: function(obj) {
	
		// Log all data
		console.log(obj);
		
		// Create demo element
		var el = document.getElementById('revibar');
		var node = document.createElement("P");
		
		// Display name from data
		node.innerHTML = 'We have data for '+obj.name+'. Beastly!'; 
		el.appendChild(node);
		
		// What the heck, display the number of reviews
		var node2 = document.createElement("P");
		node2.innerHTML = 'A whopping total of '+obj.num_reviews+' reviews is available. Please check the console log for more data.'; 
		el.appendChild(node2);		
	
	}
	
}

// Initiate plugin
tripAdvisor.init();


