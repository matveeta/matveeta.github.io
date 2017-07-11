function addBoard () {
	
	for (var i = 1; i <=8; i++) {
	 	for (var j = 1; j <= 8; j++) {
			
	 		if ((i+j)%2===0 ) {
	 			$('#main').append("<div class = 'cell_white pos_"+i+"_"+j+"'></div>");
	 		} else {
	 			$('#main').append("<div class = 'cell_black pos_"+i+"_"+j+"'></div>");
			}
	 	}
	}
	  $("#add_board").hide();
};
		
	
function getСoordinatesСhessboard () {
	 var x = $('#x').val(),
	 	y = $('#y').val();

	$(".pos_"+x+"_"+y).addClass('focus');
}
