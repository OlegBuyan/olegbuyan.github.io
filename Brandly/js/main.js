let mainSlider = new Swiper('.swiper-container', {

  direction: 'horizontal',
  loop: true,

  autoplay: {
    delay: 4000,
  },

  pagination: {
    el: '.pag-1',
    clickable: true,
  },

});

let tredingItemsSlider = new Swiper('.swiper-container1', {

  direction: 'horizontal',
  loop: true,
  clickable: true,

  autoplay: {
    delay: 15000,
  },

  pagination: {
    el: '.pag-2',
    clickable: true,
  },

});

let BlogSlider = new Swiper('.swiper-container2', {

  direction: 'horizontal',
  loop: true,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
})