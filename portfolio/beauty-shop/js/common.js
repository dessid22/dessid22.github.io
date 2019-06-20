$(document).ready(function() { 
	// .ready() - событие полной загрузки DOM (БЕЗ мультимедиа)

	$("#my-menu").mmenu({ // Инициализация и настройка Mmenu (в коде !ДО работы с API Mmenu)
		extensions: [ 'widescreen', 'theme-black', 'effect-listitems-slide', 'pagedim-black'],
		offCanvas: {
			position : 'right'
		},
		navbar: {
			title: '<span>Beauty</span> Shop'
		}
	});

	var apiM = $("#my-menu").data("mmenu"); // Через API Mmenu определяем состояние .hamburger
	apiM.bind("opened", function() { 
		// .bind - определяет состояние. Если меню открыто, то:
		$(".hamburger").addClass("is-active");
		}).bind("closed", function() {
		// .bind - определяет состояние. Если меню закрыто, то:
		$(".hamburger").removeClass("is-active");
		});

	function servicesImgHight() { // Высота картинки равна высоте контента
		$(".services-slider__item").each(function() {
			// .each() - цикл по выбранным эл-там из всего документа
			var it = $(this);
			var contentHeight = it.find(".services-slider__content").outerHeight();
			// .find() - находим эл-т, .outerHeight() - берем его внешнюю высоту
			var img = it.find(".services-slider__image");
			// find() - находим эл-т
			img.css("min-height", contentHeight);
			// задаем min-height для картинки
		});
	};

	$(".services-slider").on('initialized.owl.carousel', function() { // задаем min-height для картинки
		// .on() - устанавливает об аботчик события на выб анный л-т
		// initialized.owl.carousel - событие полной инициализации OwlCarousel
		setTimeout(function() {
			servicesImgHight()
			// выполняем servicesImgHight() после полной инициализации OwlCarousel (а не при $(document).ready)
		}, 100);
		// даем дополнительно задержку на servicesImgHight(), для подстраховки
	});

	$(".services-slider").owlCarousel({ // Инициализация и наст ойки .services-slider
		margin: 0,
		nav: true,
		navText: [
			'<i class="fa fa-angle-double-left" aria-hidden="true"></i>', 
			'<i class="fa fa-angle-double-right" aria-hidden="true"></i>'
			],
		loop: true,
		dots: false,
		smartSpeed: 700,
		fluidSpeed: 700,
		navSpeed: 700,
		dotsSpeed: 700,
		dragEndSpeed: 700,
		responsiveClass:true,
    	responsive:{
        	0:{
            	items:1
        	},
        	768:{
            	items:2
        	},
        	992:{
            	items:3
        	},
        	1200:{
            	items:3
        	}
    	}
	});

	$('.services-slider__content').equalHeights(); // Одинаковая высота 
	$('footer .col-lg-3').equalHeights(); //  

	function lastWordToSpan() { // Добавляем span к последнему слову в заголовке
		$(".services-slider__name").each(function() {
			// .each() - цикл по выбранным эл-там из всего документа
			var it = $(this);
			var text = it.text().trim();
			// .text() - текст выбранного л-та
			// .trim() - удаляет символы пробелов, табов и переносов строк из начала и конца строки
			var words = text.split(' ');
			// .split(s) - разбивает строку в массив, разбив ее по разделителю s
   			var lastWord = words.pop();
   			// .pop() - извлекает последний эл-т массива. При этом эл-т удаляется из массива
  			words.push('<span>' + lastWord + '</span>');
  			// .push() - добавляет эл-т в конец массива
   			it.html(words.join(' '));
   			// .join(s) - склеивает массив в строку, s будет разделителем в строке
		});
	};
	lastWordToSpan();

	function firstWordToSpan() { // Добавляем span к первому слову в заголовке
		$(".section-title").each(function() {
			// .each() - цикл по выбранным эл-там из всего документа
			var it = $(this);
			var text = it.text().trim();
			// .text() - текст выбранного эл-та
			// .trim() - удалят символы пробелов, табов и пеносов строк из начала и конца строки
			var words = text.split(' ');
			// .split(s) - разбивает строку в массив, разбив по разделителю s
   			var firstWord = words.shift();
   			// .shift() - извлекает первый эл-т массива. При этом эл-т удаляется из массива
  			words.unshift('<span>' + firstWord + '</span>');
  			// .unshift() - добавляет эл-т в начало массива
   			it.html(words.join(' '));
   			// .join(s) - склеивает массив в строку, s будет разделителем в строке
		});
	};
	firstWordToSpan();

	$('.gallery').fotorama({ // Íàñòðîéêè Fotorama
		minheight: '350',
		nav: 'thumbs',
		thumbwidth: '110',
		thumbheight: '65',
		thumbborderwidth: '4',
		fit: 'cover',
		thumbfit: 'cover',
		transition: 'slide',
		loop: false,
		keyboard: true,
		shadows: false,
		click: true,
		swipe: true,
		arrows: 'always'
	});

	$(window).scroll(function() { // Äåëàåì âèäèìîé êíîïêó "íàâåðõ"
		// $(window) - îêíî áðàóçåðà
		// .scroll() - ñîáûòèå ïðîêðóòêè
		if($(this).scrollTop() > $(this).height()) {
		//.scrollTop() - çíà÷åíèå îòñòóïà ïðîêðóòêè ñâåðõó
			$('.to-top').addClass('active');
		} else {
			$('.to-top').removeClass('active');
		}
	});

	$('.to-top').click(function() { // Ñêðîëë íàâåðõ
		$("html, body").animate({scrollTop: 0}, "slow");
		// .animate() - ïðîèçâîëüíàÿ àíèìàöèÿ íàáîðà CSS ñâîéñòâ
		return false;
		// return false - äëÿ îñòàíîâêè ðàñïðîñòðàíåíèÿ ñîáûòèÿ .click() íà äðóãèå ýëåìåíòû
	});

	$("form").submit(function() { //E-mail Ajax ôîðìà
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "../mail.php",
			data: th.serialize()
		}).done(function() { // Ïîñëå îòïðàâêè äàííûõ âûïîëíèòü ô-èè:
			// Âûâîäèì ñîîáùåíèå îá óñïåøíîé îòïðàâêå
			$(".form-message").addClass("success");
			setTimeout(function() {
				// Óäàëÿåì ñîîáùåíèå îá óñïåøíîé îòïðàâêå ÷åðåç 2000 ìñ
				$(".form-message").removeClass("success");
				// Ñáðàñûâàåì çíà÷åíèÿ ïîëåé ÷åðåç 2000 ìñ
				th.trigger("reset");
				// Çàêðûâàåì magnificPopup ÷åðåç 2000 ìñ
				var magnificPopup = $.magnificPopup.instance;
				magnificPopup.close();
			}, 2000);
		});
		return false;
	});

	$('.basic-form__select').styler(); // Èíèöèàëèçàöèÿ FormStyler

	$(".comments-slider").owlCarousel({ // Èíèöèàëèçàöèÿ è íàñòðîéêè .comments-slider
		margin: 0,
		nav: false,
		loop: true,
		dots: true,
		autoHeight: false,
		smartSpeed: 700,
		fluidSpeed: 700,
		navSpeed: 700,
		dotsSpeed: 700,
		dragEndSpeed: 700,
		responsiveClass:true,
    	responsive:{
        	0:{
            	items:1
        	},
        	768:{
            	items:1
        	},
        	992:{
            	items:1
        	},
        	1200:{
            	items:1
        	}
    	}
	});

	$(".partners-slider").owlCarousel({ // Èíèöèàëèçàöèÿ è íàñòðîéêè .partners-slider
		margin: 50,
		nav: true,
		navText: [
			'<i class="fa fa-angle-left" aria-hidden="true"></i>', 
			'<i class="fa fa-angle-right" aria-hidden="true"></i>'
			],
		loop: true,
		dots: false,
		smartSpeed: 700,
		fluidSpeed: 700,
		navSpeed: 700,
		dotsSpeed: 700,
		dragEndSpeed: 700,
		responsiveClass:true,
    	responsive:{
        	0:{
            	items:1
        	},
        	768:{
            	items:2
        	},
        	992:{
            	items:4
        	},
        	1200:{
            	items:4
        	}
    	}
	});

	// Скрываем прелоадер после загрузки DOM
	$('.preloader').fadeOut();

});

$(window).on('load', function() { // Ïðåëîàäåð çàãðóçêè
	// $(window) - îêíî áðàóçåðà
	// .on() - óñòàíàâëèâàåò îáðàáîò÷èê ñîáûòèÿ íà âûáðàííûé ýë-ò
	// .load() - ñîáûòèå ïîëíîé çàãðóçêè DOM (ÂÊËÞ×Àß ìóëüòèìåäèà)
});