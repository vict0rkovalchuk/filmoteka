import FilmsByYear from './filmsByYear';

export default class Searching {
  constructor(url, bgImgLink, filmsByYearLink) {
    this.url = url;
    this.filmsByYearLink = filmsByYearLink;
    this.bgImgLink = bgImgLink;
    this.list = document.querySelector('.main .main__populars');
  }

  fetchQuery() {
    fetch(this.url)
      .then(res => res.json())
      .then(data => {
        document
          .querySelectorAll('.pagination')
          .forEach(item => (item.style.display = 'none'));
        this.renderQueryResult(data.results);
        new FilmsByYear(
          this.filmsByYearLink,
          this.bgImgLink
        ).fetchDefaultFilms();
      })
      .catch(err => alert(err));
  }

  renderQueryResult(arrResults) {
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
          src="${this.bgImgLink}${film.poster_path}"
          alt="${movieTitle}"
        />
      </div>
      <div class="item__descr">
        <div class="item__title">${movieTitle}</div>
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
  }

  init() {
    this.fetchQuery();
  }
}
