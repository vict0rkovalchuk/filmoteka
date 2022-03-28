import FilmsByYear from './filmsByYear';

export default class PopularFilms {
  constructor(weekUrl, bgImgLink, filmsByYearLink) {
    this.weekUrl = weekUrl;
    this.bgImgLink = bgImgLink;
    this.counter = 1;
    this.filmsByYearLink = filmsByYearLink;
  }

  renderFilmsPage() {
    fetch(this.weekUrl + this.counter)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        let ul = document.querySelector('.main .main__populars');
        ul.innerHTML = '';
        document
          .querySelectorAll('.pagination')
          .forEach(item => (item.style.display = 'none'));

        data.results.forEach(film => {
          let movieTitle;
          let movieReleaseData;

          film.original_title
            ? (movieTitle = film.original_title)
            : (movieTitle = film.original_name);

          film.release_date
            ? (movieReleaseData = film.release_date)
            : (movieReleaseData = film.first_air_date);

          ul.innerHTML += `<li class="item">
          <div class="item__img">
            <img
              src="${this.bgImgLink + film.poster_path}"
              alt="img"
            />
            <div class="hover-effect">
              <div class="hover-text">
            <button type="button" data-id="${
              film.id
            }" class="btn btn-watched btn-outline-light">add to Watched</button>
            <button type="button" data-id="${
              film.id
            }" class="btn btn-queue btn-outline-light">add to Queue</button>
            <button type="button" data-id="${
              film.id
            }" class="btn btn-watch btn-outline-light">watch</button>
              </div>
            </div>
          </div>

      <div class="item__descr">
        <div class="item__title" data-id="${film.id}">${movieTitle}</div>
        <div class="item__info">
          <a href="#main" class="item__releasedata" data-release='${new Date(
            movieReleaseData
          ).getFullYear()}'><span>${new Date(
            movieReleaseData
          ).getFullYear()}</span>,&ensp;</a>
          <div class="item__country">
        Rating: ${film.vote_average}/10
          </div>
        </div>
      </div>
    </li>`;
        });
        ul.insertAdjacentHTML(
          'beforeend',
          `<div class="button-item"><button type="button" class="btn btn-outline-success">Load 20 more</button></div>`
        );
        this.loadMoreFilms();
        new FilmsByYear(
          this.filmsByYearLink,
          this.bgImgLink
        ).fetchDefaultFilms();
      })
      .catch(err => alert(err));
  }

  loadMoreFilms() {
    document
      .querySelector('.button-item button')
      .addEventListener('click', () => {
        this.counter++;
        fetch(this.weekUrl + this.counter)
          .then(res => res.json())
          .then(data => {
            let btnItem = document.querySelector('.button-item');

            data.results.forEach(film => {
              let movieTitle;
              let movieReleaseData;

              film.original_title
                ? (movieTitle = film.original_title)
                : (movieTitle = film.original_name);

              film.release_date
                ? (movieReleaseData = film.release_date)
                : (movieReleaseData = film.first_air_date);

              btnItem.insertAdjacentHTML(
                'beforebegin',
                `<li class="item">
                  <div class="item__img">
                    <img
                      src="${this.bgImgLink + film.poster_path}"
                      alt="img"
                    />
                    <div class="hover-effect">
                      <div class="hover-text">
                        <button type="button" data-id="${
                          film.id
                        }" class="btn btn-watched btn-outline-light">add to Watched</button>
                        <button type="button" data-id="${
                          film.id
                        }" class="btn btn-queue btn-outline-light">add to Queue</button>
                        <button type="button" data-id="${
                          film.id
                        }" class="btn btn-watch btn-outline-light">watch</button>
                      </div>
                    </div>
                  </div>

                <div class="item__descr">
                  <div class="item__title" data-id="${
                    film.id
                  }">${movieTitle}</div>
                  <div class="item__info">
                  <a href="#main" class="item__releasedata" data-release='${new Date(
                    movieReleaseData
                  ).getFullYear()}'><span>${new Date(
                  movieReleaseData
                ).getFullYear()}</span>,&ensp;</a>
                    <div class="item__country">
                  Rating: ${film.vote_average}/10
                    </div>
                  </div>
                </div>
              </li>`
              );
            });
            new FilmsByYear(
              this.filmsByYearLink,
              this.bgImgLink
            ).fetchDefaultFilms();
          })
          .catch(err => alert(err));
      });
  }

  init() {
    this.renderFilmsPage();
  }
}
