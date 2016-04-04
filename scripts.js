document.addEventListener("DOMContentLoaded", function(event) { 
		console.log("????\t\t"+document.getElementById("abcdef") + "\n" +$("#abcdef").text("abcdef") + "ssd");
	// });

		// document.getElementById("abcdef").textContent = "dgfhjklhgfdhj";

// $(document).ready(function() {
	var firebase = new Firebase("https://article-summarizer.firebaseio.com/");
	var firebaseToken = "";

	function getArticleData(url, callback, errorCallback) {
		var data = {"url" : url};
		$.ajax({
			type: "POST",
			url: "http://article-summarizer.herokuapp.com",
			data: JSON.stringify(data),
			success: function(data){
				console.log(data);
			},
			error: function(){
				//??
			}
		});
	}

	function getRandomToken() {
		var randomPool = new Uint8Array(32);
		crypto.getRandomValues(randomPool);
		var hex = '';
		for (var i = 0; i < randomPool.length; ++i) {
			hex += randomPool[i].toString(16);
		}
		return hex;
	}

	function userAuth()
	{
		firebase.once('value', function(snapshot) {
			if (snapshot.hasChild(firebaseToken)){
				firebase = firebase.child(firebaseToken);
				//load data into the html page
				ref.once("value", function(snapshot) {
					// The callback function will get called twice, once for "fred" and once for "barney"
					snapshot.forEach(function(childSnapshot) {
						// key will be "fred" the first time and "barney" the second time
						var key = childSnapshot.key();
						// childData will be the actual contents of the child
						var childData = childSnapshot.val();//array of values
						//LOAD THE VALUES OF EVERYTHING FROM FIREBASE HERE
					});
				});
			}
			else
			{
				//??
			}
		});
	}

	chrome.storage.sync.get('userid', function(items) {
		var userid = items.userid;
		if (userid)
		{
			useToken(userid);
		}
		else
		{
			userid = getRandomToken();
			chrome.storage.sync.set({userid: userid}, function() {
				useToken(userid);
			});
		}
		function useToken(userid) {
			firebaseToken = userid;
			console.log(userid);
			userAuth();
		}
	});


	console.log("sdf");

	

	$("#mainTable").addEventListener('click', function() {

		console.log("sdfdsfdfsdsf");
		// getCurrentTabUrl(function(url) {
		// 	// Put the image URL in Google search.
		// 	renderStatus('Performing Google Image search for ' + url);

		// 	getImageUrl(url, function(imageUrl, width, height) {

		// 		renderStatus('Search term: ' + url + '\n' +
		// 				'Google image search result: ' + imageUrl);
		// 		var imageResult = document.getElementById('image-result');
		// 		// Explicitly set the width/height to minimize the number of reflows. For
		// 		// a single image, this does not matter, but if you're going to embed
		// 		// multiple external images in your page, then the absence of width/height
		// 		// attributes causes the popup to resize multiple times.
		// 		imageResult.width = width;
		// 		imageResult.height = height;
		// 		imageResult.src = imageUrl;
		// 		imageResult.hidden = false;

		// 	}, function(errorMessage) {
		// 		renderStatus('Cannot display image. ' + errorMessage);
		// 	});
		// });
	});


	$("#abcdef").on("click", function(){
		console.log("button click");
		$(".articleName").text(url);
		// getCurrentTabUrl(function(url) {
		// 	// Put the image URL in Google search.
		// 	// renderStatus('Performing Google Image search for ' + url);
		// 	$(".articleName").text(url);

		// 	// getArticleData(url, function(data) {
		// 	// 	// do stuff with the data
		// 	// 	//add to firebase, display to user

		// 	// }, function(errorMessage) {
		// 	// 	renderStatus('Cannot display image. ' + errorMessage);
		// 	// });
		// });
	});
	console.log("--");

});