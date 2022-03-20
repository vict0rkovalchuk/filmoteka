import fastreplace from 'handlebars-loader/lib/fastreplace';
import $ from 'jquery';

export default class PopularFilms {
  constructor(url, bgImgLink) {
    this.url = url;
    this.bgImgLink = bgImgLink;
  }

  renderFilmsPage() {
    fetch(this.url)
      .then(res => res.json())
      .then(data => {
        console.log(data);

        let ul = document.querySelector('.main .main__populars');

        data.results.forEach(film => {
          let movieTitle;
          let movieReleaseData;

          if (film.original_title) {
            movieTitle = film.original_title;
          } else {
            movieTitle = film.original_name;
          }

          if (film.release_date) {
            movieReleaseData = film.release_date;
          } else {
            movieReleaseData = film.first_air_date;
          }

          ul.innerHTML += `<li class="item">
      <div class="item__img">
        <img
          src="${this.bgImgLink + film.poster_path}"
          alt="img"
        />
      </div>
      <div class="item__descr">
        <div class="item__title">${movieTitle}</div>
        <div class="item__info">
          <div class="item__releasedata">${new Date(
            movieReleaseData
          ).getFullYear()},&ensp;</div>
          <div class="item__country">
        Rating: ${film.vote_average}/10
          </div>
        </div>
      </div>
    </li>`;
        });
      })
      .catch(err => alert(err));
  }

  renderSliderFilms() {
    fetch(this.url)
      .then(res => res.json())
      .then(data => {
        console.log(data);

        let slick = document.querySelector('.popularfilms-slider');

        data.results.splice(0, 12).forEach(film => {
          slick.innerHTML += ` <div class="item"><img src="${
            this.bgImgLink + film.poster_path
          }" alt="img" /></div>`;
        });
        $('.popularfilms-slider').slick({
          autoplay: true,
          autoplaySpeed: 3000,
          arrows: false,
          // focusOnSelect: true,
          // lazyLoad: 'progressive',
          // pauseOnHover: false,
          // pauseOnDotsHover: true,
          // rows: 2,
          // swipe: true,
          // variableWidth: true,
          // vertical: true,
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
                // slidesToShow: 5
              }
            },
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 5
                // slidesToShow: 4
              }
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 4
                // slidesToShow: 3
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 3
                // slidesToShow: 2
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
                vertical: true,
                verticalSwiping: true,
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
    this.renderFilmsPage();
  }
}
