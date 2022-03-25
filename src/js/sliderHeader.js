import $ from 'jquery';

export default class Slider {
  constructor(dayUrl, bgImgLink) {
    this.dayUrl = dayUrl;
    this.bgImgLink = bgImgLink;
  }

  renderSliderFilms() {
    fetch(this.dayUrl)
      .then(res => res.json())
      .then(data => {
        // console.log(data);

        let slick = document.querySelector('.popularfilms-slider');

        data.results.splice(0, 12).forEach(film => {
          slick.innerHTML += ` <div class="item"><img src='${
            this.bgImgLink + film.poster_path
          }' alt='img'/></div>`;
        });
        $('.popularfilms-slider').slick({
          autoplay: true,
          autoplaySpeed: 3000,
          arrows: false,
          dots: true,
          speed: 800,
          slidesToShow: 6,
          slidesToScroll: 1,
          swipeToSlide: true,
          responsive: [
            {
              breakpoint: 1400,
              settings: {
                slidesToShow: 6
              }
            },
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 5
              }
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 4
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 3
              }
            },
            {
              breakpoint: 576,
              settings: {
                slidesToShow: 2
              }
            },
            {
              breakpoint: 384,
              settings: {
                slidesToShow: 1
              }
            }
          ]
        });
      })
      .catch(err => alert(err));
  }

  init() {
    this.renderSliderFilms();
  }
}
