$(document).ready(function() {

    // ===== Длобавление class BODY при загрузке страницы
	$('body').addClass('_load');

	if (navigator.userAgent.indexOf('Mac OS X') != -1) {
		$("body").addClass("mac");
	} else {
		$("body").addClass("pc");
	}

	// === Burger menu
	$('.header__burger').click(function() {
		$('.header__nav--mob').slideDown();
		$(this).css('display', 'none');
		$('.header__burger--active').css('display', 'flex');
	});

	$('.header__burger--active').click(function() {
		$('.header__nav--mob').slideUp();
		$(this).css('display', 'none');
		$('.header__burger').css('display', 'flex');
	});

	$(window).resize(function() {
		if ($(window).width() >= 1250) {
			$('.header__burger--active').css('display', 'none');
			$('.header__burger').css('display', 'none');
			$('.header__nav--mob').css('display', 'none');
		} else {
			$('.header__burger').css('display', 'flex');
			$('.header__burger--active').css('display', 'none');
			$('.header__nav--mob').css('display', 'none');
		}
	});

	// fixed header
	$(window).scroll(function(e) {
		let scroll = $(window).scrollTop();
		if (scroll >= 45) {
			$('.header').addClass('header--fixed');
			$('.header__nav--mob').css('background', 'white');
		} else {
			$('.header').removeClass('header--fixed');
			$('.header__nav--mob').css('background', 'rgba(243, 243, 243, 1)');
		}
	});

	// dropdown

	$('.header .menu-item-has-children').mouseenter(function() {
		$(this).find('.sub-menu').addClass('active');
	});

	$('.header .sub-menu').mouseleave(function() {
		$(this).removeClass('active');
	});

	$('.header ul li').mouseenter(function(e) {
		if(!$(this).hasClass('menu-item-has-children')) {
			if ($(this).parents('.sub-menu').length <= 0) {
				$('.header .sub-menu').removeClass('active');
			}
		}
	});

	$('.header').mouseleave(function() {
		$('.header .sub-menu').removeClass('active');
	});

	// sliders

	$('.objects__item').each(function(index, element) {
		let ind = (index+1);
		
		let thumbSwiper = new Swiper(('#t' + ind), {
			slidesPerView: 8,
		});
		let objectsSwiper = new Swiper(('#o' + ind), {
			spaceBetween: 10,
			navigation: {
				nextEl: '#o' + ind + ' .swiper-button-next',
				prevEl: '#o' + ind + ' .swiper-button-prev',
			},
			slidesPerView: 1,
			thumbs: {
				swiper: thumbSwiper
			}
		});
	});

	let ourobjSwiper = new Swiper('.ourobj__slider', {
		spaceBetween: 16,
		slidesPerView: 1.4,
		breakpoints: {  
			'768': {
			  slidesPerView: 2,
			  spaceBetween: 27,
			},
			'1100': {
			  slidesPerView: 3,
			  spaceBetween: 36,
			},
		},
	});

	let lettersSwiper = new Swiper('.letters__slider', {
		spaceBetween: 20,
		slidesPerView: 1.5,
		breakpoints: {  
			'768': {
				slidesPerView: 3,
			},
			'992': {
				slidesPerView: 4,
			},
			'1100': {
				slidesPerView: 4,
				spaceBetween: 50,
			},
			'1550': {
				slidesPerView: 4,
				spaceBetween: 115,
			},
		},
	});

	// sliders

	function scaleHeader() {
		var scalable = document.querySelectorAll('.scale--js');
		var margin = 10;
		for (var i = 0; i < scalable.length; i++) {
		  var scalableContainer = scalable[i].parentNode;
		  scalable[i].style.transform = 'scale(1)';
		  var scalableContainerWidth = scalableContainer.offsetWidth - margin;
		  var scalableWidth = scalable[i].offsetWidth;
		  scalable[i].style.transform = 'scale(' + scalableContainerWidth / scalableWidth + ')';
		  scalableContainer.style.height = scalable[i].getBoundingClientRect().height + 'px';
		}
	} 
	  
	function debounce(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};
	  
	var myScaleFunction = debounce(function() {
		scaleHeader();
	}, 250);
	  
	myScaleFunction();
	
	window.addEventListener('resize', myScaleFunction);

	initMap();

	async function initMap() {
		await ymaps3.ready;

		const {YMap, YMapDefaultSchemeLayer} = ymaps3;

		const map = new YMap(
			document.getElementById('map'),
			{
				location: {
					center: [37.588144, 55.733842],
					zoom: 10
				}
			}
		);

		map.addChild(new YMapDefaultSchemeLayer());
	}

});

