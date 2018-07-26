var globalSettings = {
		galleryServer : "http://localhost:3000",
		galleryFolder : "galleries"
	};

$( document ).ready(function() {
	var galleryListElement = $("#galleryList");
	populateGalleryList(galleryListElement);
});

function getGalleryList(){
	return ( $.getJSON( globalSettings.galleryServer + "/galleryindex", {
				format: "json"
			 })
			);
}

function getGalleryImages(id){
	return ( $.getJSON( globalSettings.galleryServer + "/gallery?id=" + id, {
				format: "json"
			 })
			);
}

function populateGalleryImages(listControlElementPrefix, id){
  getGalleryList().done(function( galleryList ) {
	  getGalleryImages(id).done(function( data ) {
		  $.each( data, function( index, imageFilename ) {
				var listControlElement = $("#" + listControlElementPrefix + id);
				listControlElement.append("<img title='"+ imageFilename +"' style='float:left' width=300 src='" + globalSettings.galleryFolder + "/" + galleryList[id] + "/" + imageFilename + "'>");
		  });
	  });
  });
}



function populateGalleryList(listControlElement){


  getGalleryList().done(function( data ) {
		for(var index=0;index<data.length;index++){
			galleryItem = data[index];
			//$.each( data, function( index, galleryItem ) {
			listControlElement.append("<h1>" + galleryItem + "</h1><div id='galleryIndex"+index+"'/><div style='clear: left;'/>");
			populateGalleryImages("galleryIndex", index);
	  };
  });
}
