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
		//console.log(obj);

		// Module: Rating
		renderRating(obj.subratings[0].value, 'brb-module-rating-location');
		renderRating(obj.subratings[1].value, 'brb-module-rating-sleep');
		renderRating(obj.subratings[2].value, 'brb-module-rating-rooms');
		renderRating(obj.subratings[3].value, 'brb-module-rating-service');
		renderRating(obj.subratings[4].value, 'brb-module-rating-value');
		renderRating(obj.subratings[5].value, 'brb-module-rating-cleanliness');

		renderRating(obj.rating, 'brb-module-traveler-rating');
		renderField(obj.num_reviews + ' reviews', 'brb-review-count');

		// Module: Reviews
		renderReviews(obj.review_rating_count, obj.num_reviews);

		// Module: Ranking
		renderRanking(obj.ranking_data.ranking, obj.ranking_data.ranking_out_of, 'brb-module-ranking');

		self.initSwitch();

		function renderRanking(ranking, ranking_out_of, id) {

			var module = document.getElementById(id);

			module.getElementsByClassName('brb-rank')[0].innerHTML = ranking;

			module.getElementsByClassName('brb-rank-small')[0].innerHTML = ranking;

			module.getElementsByClassName('brb-rank-out-of')[0].innerHTML = ranking_out_of;

		}

		function renderRating(rating, id) {

			var module = document.getElementById(id);
			var items = module.getElementsByClassName('brb-bullet');

			for (var i = 0; i < items.length; i++) {

				if (i < (rating-1)) {
					items[i].classList.add('brb-full');
				} else if (i > (rating-1) && i < (i+1)) {
					items[i].classList.add('brb-full');
					items[i].classList.add('brb-half');
				} else {
					items[i].classList.add('brb-empty');
				}

			}

		}

		function renderReviews(review_rating_count, num_reviews) {

			var module = document.getElementById('brb-module-reviews');

			var nodeList = '';

			var labelArray = ['','Terrible','Poor','Average','Very Good','Excellent'];

			for (var i = 5; i >= 0; i--) {

				var width = (review_rating_count[i] / num_reviews) * 100;

			    var label = labelArray[i];

			    if (label != '') {
					nodeList += '<li class=""><span class="brb-data-title">' + label + '</span><div class="brb-data-bar-bg"><div class="brb-data-bar" style="width:'+ width+'%"></div></div></li>';
				}

			}

			var mainNode = module.getElementsByTagName("UL")[0];

			mainNode.innerHTML = nodeList;

		}

		function renderField(data, id) {

			var field = document.getElementById(id);
			field.innerHTML = data;

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
