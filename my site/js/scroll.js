function scrollyAncors (sSelector) {
	var s = this;

	s.scroll = $(sSelector);
	s.scrollItem = s.scroll.find('.goto-next');


	s.srollPage = function(event){
		event.preventDefault();

		//забираем идентификатор бlока с атрибута href
		var id  = $(this).attr('href'),

        //узнаем высоту от начала страницы до блока на который ссылается якорь

            top = $(id).offset().top;
        //анимируем переход на расстояние - top за 1500 мс
        $('body,html').animate({scrollTop: top}, 1500);


	};
	s.scrollItem.click(s.srollPage);

};