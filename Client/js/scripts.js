var globalSettings = {
		galleryServer : "http://localhost:3000",
		galleryFolder : "galleries"
	};

$( document ).ready(function() {
	var oversigtElement = $("#galleryList");
	populateGalleryList(oversigtElement);

	var galleriElement = $("#galleryShow");

	// Vi henter inde 1 (som vi ved er Clipart)
	populateGalleryImages(galleriElement, 1);
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

function populateGalleryImages(listControlElement, id){
  getGalleryList().done(function( galleryList ) {
	  getGalleryImages(id).done(function( data ) {
		  $.each( data, function( index, imageFilename ) {
			listControlElement.append("<img title='"+ imageFilename +"' style='float:left' width=300 src='/" + globalSettings.galleryFolder + "/" + galleryList[id] + "/" + imageFilename + "'>");
		  });
	  });
  });
}



function populateGalleryList(listControlElement){
  getGalleryList().done(function( data ) {
	  $.each( data, function( index, galleryItem ) {
		listControlElement.append(index + ": " + galleryItem + "<br>");
	  });
  });
}
