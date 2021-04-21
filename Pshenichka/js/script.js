//убрать / добавить класс
$(document).ready(function() {
   $('.wrapper__burger').click(function(event) {
      $('.wrapper__burger, .wrapper__nav').toggleClass('show');
      $('body').toggleClass('lock');
   });
   $('.wrapper___list__link').click(function(event) {
    $('.wrapper__burger, .wrapper__nav').toggleClass('show');
    $('body').toggleClass('lock');
 });
});
// анимация при скроле
const animItems = document.querySelectorAll("._anim-items")
if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll)

    function animOnScroll() {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index]
            const animItemHeight = animItem.offsetHeight
            const animItemOffSet = offset(animItem).top
            const animStart = 4
            let animItemPoint = window.innerHeight - animItemHeight / animStart
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart
            }
            if ((pageYOffset > animItemOffSet - animItemPoint) && pageYOffset < (animItemOffSet + animItemHeight)) {
                animItem.classList.add('_active')
            } else {
                if (!(animItem.classList.contains('_anim-no-hide'))) {
                    animItem.classList.remove('_active')
                }
            }
        }
    }

    function offset(el) {
        const rect = el.getBoundingClientRect()
        let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop
        return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
    }

    setTimeout(function () {
        animOnScroll()
    }, 100)
}
// анимация тайтла
var paragraph = document.getElementsByTagName('h1')[0];
function textEffect(animationName) {
  var text = paragraph.innerHTML,
		chars = text.length,
		newText = '',
		animation = animationName,
		char,
		i;

	for (i = 0; i < chars; i += 1) {
      newText += '<i>' + text.charAt(i) + '</i>';
	}

	paragraph.innerHTML = newText;

	var wrappedChars = document.getElementsByTagName('i'),
		wrappedCharsLen = wrappedChars.length,
		j = 0;

	function addEffect () {
		setTimeout(function () {
			wrappedChars[j].className = animation;
			j += 1;
			if (j < wrappedCharsLen) {
            addEffect();
			}
      }, 100)

	}
	addEffect();
};
textEffect('fly-in-out');
// кнопка "наверх"
$(function() {
    $(window).scroll(function() {
        if ($(this).scrollTop() > $(this).height()) {
            $('.top').addClass('active');
        } else {
            $('.top').removeClass('active');
        }
    });
    $('.top').click(function(){
        $('html, body').stop().animate({scrollTop: 0}, 'slow', 'swing');
    });
});
// убрать меню при прокрутке
var header = $('.wrapper__line'),
	scrollPrev = 0;
$(window).scroll(function() {
	var scrolled = $(window).scrollTop();
	if ( scrolled > 100 && scrolled > scrollPrev ) {
		header.addClass('out');
	} else {
		header.removeClass('out');
	}
	scrollPrev = scrolled;
});
new Swiper('.swiper-container', {
    spaceBetween: 100,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    loop: true,
});
new Swiper('.smm__swiper__conteiner', {
    spaceBetween: 100,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    loop: true,
});
// якорь меню при скроле

// $(function () {
//     $(document).scroll(function () {
//         var currentHash = '';
//         $('.anchor').each(function () {
//             var top = window.pageYOffset;
//             var distance = top - $(this).offset().top;
//             var hash = $(this).attr('id');
//             if (distance < 30 && distance > -30 && currentHash != hash) {
//                 window.location.hash = hash;
//             }
//         });
//     });
// });
// плавный переход к якорю
$("nav").on("click","a", function (event) {
   // исключаем стандартную реакцию браузера
   event.preventDefault();
   // получем идентификатор блока из атрибута href
   var id  = $(this).attr('href'),
   // находим высоту, на которой расположен блок
       top = $(id).offset().top;
       console.log(id)
   // анимируем переход к блоку, время: 800 мс
   $('body,html').animate({scrollTop: top}, 400);
});

// popup
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");
let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index]
        popupLink.addEventListener("click", function (e) {
            header.addClass('out');
            $('.top').removeClass('active');
            const popupName = popupLink.getAttribute('href').replace('#', '')
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault();
        });
    }
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener ('click', function (e) {
            popupClose(el.closest(".popup"));
            e.preventDefault();
        })
    }
}

function popupOpen (curentPopup) {
    if (curentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open')
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        curentPopup.classList.add('open');
        curentPopup.addEventListener("click", function (e) {
            if (!e.target.closest(".popup__content")) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}

function popupClose (popupActive, doUnlock) {
    doUnlock = true;
    if(unlock) {
        $('.top').addClass('active');
        header.removeClass('out');
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnlock();
        }
    }
}
function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
    if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
        }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock_popup')

    unlock = false
    setTimeout(function(){
        unlock = true;
    }, timeout)
}
function bodyUnlock() {
    setTimeout(function() {
        for(let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = '0px';
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock_popup');

    }, timeout);

    unlock = false;
    setTimeout(function() {
        unlock = true;
    }, timeout);
}
document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
        const popupActive = document.querySelector('.popup.open')
        popupClose(popupActive);
    }
});
(function () {
    if(!Element.prototype.closest) {
        Element.prototype.closest = function(css) {
            var node = this;
            while (node) {
                if (node.matches(css)) return node;
                else node = node.parentElement;
            }
            return null;
        };
    }
})();
(function () {
    if (Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.matchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector;
    }
})();