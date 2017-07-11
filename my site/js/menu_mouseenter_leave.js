function Menu (sSelector) {

	var m = this;


	m.menu = $(sSelector);
	m.menuItem = m.menu.find('li');

	m.showSubmenu = function () {
		
		$(this).children('ul')
			.stop()
			.css("display", "block")
			.animate({"opacity": 1}, 600);
		
	};

	m.hideSubmenu = function () {
		$(this).children('ul')
			.stop()
			.animate({"opacity": 0}
				, 600
				,function () {
					$(this).css("display", "none");
				}
			)

	};

	m.menuItem
		.mouseenter(m.showSubmenu) 
		.mouseleave(m.hideSubmenu); 

}
