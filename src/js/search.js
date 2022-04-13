import FilmsByYear from './filmsByYear';

export default class Searching {
  constructor(url, bgImgLink, filmsByYearLink) {
    this.url = url;
    this.filmsByYearLink = filmsByYearLink;
    this.bgImgLink = bgImgLink;
    this.list = document.querySelector('.main .main__populars');
    this.counter = 1;
  }

  fetchQuery() {
    fetch(this.url + this.counter)
      .then(res => res.json())
      .then(data => {
        document
          .querySelectorAll('.pagination')
          .forEach(item => (item.style.display = 'none'));

        this.renderQueryResult(data, data.results);
        if (data.total_pages > 1) {
          this.loadMoreFilms(data);
        }
        new FilmsByYear(
          this.filmsByYearLink,
          this.bgImgLink
        ).fetchDefaultFilms();
      })
      .catch(err => alert(err));
  }

  renderQueryResult(data, arrResults) {
    this.list.innerHTML = '';
    arrResults.forEach(film => {
      let movieTitle;
      let movieReleaseData;
      film.original_title
        ? (movieTitle = film.original_title)
        : (movieTitle = film.original_name);
      film.release_date
        ? (movieReleaseData = film.release_date)
        : (movieReleaseData = film.first_air_date);
      this.list.innerHTML += `<li class="item">

    <div class="item__img">
      <img
        src="${this.bgImgLink + film.poster_path}"
        alt="${movieTitle}"
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
          <div class="item__releasedata" data-release='${new Date(
            movieReleaseData
          ).getFullYear()}'>${new Date(
        movieReleaseData
      ).getFullYear()},&ensp;</div>
          <div class="item__country">
        Rating: ${film.vote_average}/10
          </div>
        </div>
      </div>
    </li>`;
    });
    if (data.total_pages > 1) {
      this.list.insertAdjacentHTML(
        'beforeend',
        `<div class="button-item"><button type="button" class="btn btn-outline-success">Load 20 more</button></div>`
      );
    }
    if (data.total_pages === 2) {
      document.querySelector('.button-item button').textContent = `Load ${
        data.total_results % data.results.length
      } more`;
    }
  }

  loadMoreFilms(data) {
    document
      .querySelector('.button-item button')
      .addEventListener('click', () => {
        this.counter++;

        switch (data.total_pages - this.counter) {
          case 1:
            document.querySelector('.button-item button').textContent = `Load ${
              data.total_results % data.results.length
            } more`;
            break;
          case 0:
            document.querySelector('.button-item button').style.display =
              'none';
            break;

          default:
            break;
        }

        fetch(this.url + this.counter)
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
                  alt="${movieTitle}"
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
                    <div class="item__releasedata" data-release='${new Date(
                      movieReleaseData
                    ).getFullYear()}'><span>${new Date(
                  movieReleaseData
                ).getFullYear()}</span>,&ensp;</div>
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
    this.fetchQuery();
  }
}
