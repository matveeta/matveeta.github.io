function Gallery (sSelector) {
	var g  = this;

	g.gallery = $(sSelector);
	g.pictures = g.gallery.find('.picture');
	g.arrowPrev = g.gallery.find('.preview__arrow_prev');
	g.arrowNext = g.gallery.find('.preview__arrow_next');
	g.preview = g.gallery.find('.preview');// блок просмотра
	g.previewImage  = g.gallery.find('.preview__image'); // большое фото
	g.previewText  = g.gallery.find('.preview__text');//подпись к большому фото
	g.current = 0; //номер текущего фото

	g.max = g.pictures.length;
	console.log(g.max);

	g.currentNumBlock = g.gallery.find(".preview__currentNum");
	g.qtyBlock = g.gallery.find(".preview__qty");


	g.startBtn = g.gallery.find(".preview__btn_start");
	g.stopBtn = g.gallery.find(".preview__btn_stop");

	g.slideShowPeriod = 1000; // время для автопрокрутки
	g.timer = null;


	g.showPreview = function () {
		//показать блок превью

		var picture = $(this);
		
		

		// cохраням в свойство current номер дива с фото,
		//по которой кликнули

		g.current = g.pictures.index(picture);
		//показать превью с большой картинкой
		g.display(picture);
		console.log(g.current);
	};

	g.closePreview = function (event) {
		//скріть блок превью

		g.stop();
		if (!event || $(event.target).hasClass('preview')) {
			g.preview.removeClass('preview_shown');
		};

	};

	g.showImage = function (iShift) { // на вход подаем сдвиг iShift
		/* показать фото*/
		//в номер текущего фото дописіваем сдвиг
		g.current += iShift;

		if (g.current >= g.max) {
			g.current = 0;
		} else if (g.current < 0) {
			g.current = g.max- 1;
		}

		
		g.display(g.gallery.find(".picture:eq(" + g.current + ")"));

	};

	g.display= function (oPicture) {
		/* показать фото*/
		//сохраним в переменную smallImage путь к маленькому фото
		var smallImage = oPicture.find('.picture__image')
		// c помощью метода replace заменим в атрибуте src приставку small_ на ""
			,bigImageSrc = smallImage.attr('src').replace('small_','')
		;

		console.log(bigImageSrc);
		// подставим в превью путь к большому фото:
		g.previewImage.attr('src', bigImageSrc);
		//показать подпись картинки 
		g.previewText.html(smallImage.attr('alt'));
		
			g.currentNumBlock.html(g.current + 1);
			g.qtyBlock.html(g.max);

		// сделать видимім блок превью!!! добавляем класс из css
		g.preview.addClass('preview_shown');

	};
	g.showPrevious = function () {
		//показать предідущее фото
		g.showImage(-1); // 1 = iShift

	};
	g.showNext = function () {
		//показать следующее фото
		g.showImage(1); // -1 = iShift
		console.log("start");
	};

	g.escclosePreview = function (event) {
		/*нажатие на кнопку */
		// код кнопки esc == 27

		if (event.which == 27) {
		g.closePreview();

		};
		

	};

	g.rightShowNext = function (event) {
		//клавиша вправо = 39
		if (event.which == 37) {
		g.showNext();

		};
	};

	g.leftShowNext = function (event) {
		/*клавиша влево = 37 */
		if (event.which == 39) {
		g.showPrevious();

		};
	};

	//Методі автопрокрутки картинок

	g.start= function () {
		/* body... */
		
		g.timer = setInterval(g.showNext, g.slideShowPeriod);
	};

	g.stop = function () {
		/* body... */

		clearInterval(g.timer);
	};

	


//собітия!!!

g.pictures.click(g.showPreview);
g.preview.click(g.closePreview);
g.arrowPrev.click(g.showPrevious);
g.arrowNext.click(g.showNext);

$('body').keyup(g.escclosePreview);
$('body').keyup(g.rightShowNext);
$('body').keyup(g.leftShowNext);

g.previewImage.click(g.showNext);
g.startBtn.click(g.start);
g.stopBtn.click(g.stop);

};