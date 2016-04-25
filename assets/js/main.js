// Revibar plugin code (for now only TripAdvisor support, more will follow)
var Revibar = {

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

		var self = this;
	
		// Log all data
		console.log(obj);

		// Module: Rating
		renderRating(obj.rating);

		// Module: Reviews
		renderReviews(obj.review_rating_count, obj.num_reviews);

		// // Create demo element
		// var el = document.getElementById('brb-module-review');
		// var node = document.createElement("P");
		
		// // Display name from data
		// node.innerHTML = 'We have data for '+obj.name+'. Beastly!'; 
		// el.appendChild(node);
		
		// // What the heck, display the number of reviews
		// var node2 = document.createElement("P");
		// node2.innerHTML = 'A whopping total of '+obj.num_reviews+' reviews is available. Please check the console log for more data.'; 
		// el.appendChild(node2);

		self.initSwitch();

		function renderRating(rating) {

			var module = document.getElementById('brb-module-rating');
			var items = module.getElementsByClassName('brb-bullet');

			for (var i = 0; i < items.length; i++) {

				if (i < (rating-1)) {
					items[i].classList.add('brb-full');
				} else if (i > (rating-1) && i < (i+1)) {
					items[i].classList.add('brb-full');
					items[i].classList.add('brb-half');
				} else {
					items[i].classList.add('empty');
				}

			}

		}

		function renderReviews(review_rating_count, num_reviews) {

			var module = document.getElementById('brb-module-reviews');

			console.log(review_rating_count);

			var nodeList = '';

			var labelArray = ['Excellent','Very Good','Average','Poor','Terrible']; 

			Object.keys(review_rating_count).forEach(function(key) {
			    console.log(key, review_rating_count[key]);

			    var width = (review_rating_count[key] / num_reviews) * 100;

			    var label = labelArray[key-1]; 

				nodeList += '<li class="brb-group"><span class="brb-data-title">' + label + '</span><div class="brb-data-bar" style="width:'+ width+'%"></div></li>';

			});

			var mainNode = module.getElementsByTagName("UL")[0];

			mainNode.innerHTML = nodeList;


		}
	
	},

	initSwitch: function() {

		var elMain = document.getElementById('brb-main');
		var elSwitch = elMain.getElementsByClassName('brb-switch')[0];

		elSwitch.addEventListener('click', function() {

			if (elMain.classList.contains("brb-active")) {
				elMain.classList.remove('brb-active');
			} else {
				elMain.classList.add('brb-active');
			}

		});

	}
	
}

// Initiate plugin
Revibar.init();


