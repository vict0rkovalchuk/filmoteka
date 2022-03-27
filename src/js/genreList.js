import $ from 'jquery';
import FilmsByYear from './filmsByYear';

export default class GenreList {
  constructor(url, id, bgImgLink) {
    this.url = url;
    this.bgImgLink = bgImgLink;
    this.list = document.querySelector('.main .main__populars');

    this.prevButton = null;
    this.nextButton = null;
    this.input = null;
    this.span = null;
    this.counter = 1;
    this.id = id;
  }

  fetchDefaultFilms() {
    this.fetchFilms();
  }

  fetchFilms() {
    this.prevButton = document.querySelector(
      `.pagination${this.id} #genre-prev`
    );
    this.nextButton = document.querySelector(
      `.pagination${this.id} #genre-next`
    );
    this.input = document.querySelector(`.pagination${this.id} input`);
    this.span = document.querySelector(`.pagination${this.id} .page-amount`);

    let url = this.url + this.id + '&page=' + this.counter;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.renderFilms(data.results);
        new FilmsByYear(
          `https://api.themoviedb.org/3/discover/movie?api_key=fb2d223cbf586b1c9599530eaa26a8db&year=`,
          this.bgImgLink
        ).fetchDefaultFilms();
        document
          .querySelectorAll('.genre-name')
          .forEach(item => (item.style.display = 'none'));
        $(`.genre-name-${this.id}`).css('display', 'block');

        document
          .querySelectorAll('.pagination')
          .forEach(item => (item.style.display = 'none'));
        $(`.pagination${this.id}`).css('display', 'block');
        this.renderPagination(data);
      })
      .catch(err => console.log(err));
  }

  renderFilms(arrResults) {
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
          src="https://image.tmdb.org/t/p/w500/${film.poster_path}"
          alt="${movieTitle}"
        />
      </div>
      <div class="item__descr">
        <div class="item__title">${movieTitle}</div>
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
  }

  renderPagination(response) {
    let { total_pages, page } = response;
    this.input.setAttribute('max', total_pages);

    if (this.counter === 1 || this.counter < 1) {
      this.prevButton.setAttribute('disabled', true);
    } else {
      this.prevButton.removeAttribute('disabled');
    }

    if (this.counter === total_pages || this.counter > total_pages) {
      this.nextButton.setAttribute('disabled', true);
    } else {
      this.nextButton.removeAttribute('disabled');
    }

    this.span.textContent = total_pages;
    this.input.value = page;
  }

  nextPage() {
    this.counter += 1;
    console.log(this.url + this.id + '&page=' + this.counter);
    this.fetchFilms();
    this.input.value = this.counter;
  }

  prevPage() {
    this.counter -= 1;
    this.fetchFilms();
    this.input.value = this.counter;
  }

  inputChange(event) {
    let inputValue = +event.target.value;

    if (
      (inputValue < this.input.getAttribute('min') ||
        inputValue > this.input.getAttribute('max')) &&
      inputValue
    ) {
      alert(
        `Value must be between ${this.input.getAttribute(
          'min'
        )} and ${this.input.getAttribute('max')}, including them`
      );
    } else {
      this.counter = +inputValue;
    }

    if (!inputValue) {
      return;
    } else {
      if (this.counter < 1) {
        return;
      } else if (this.counter > this.input.getAttribute('max')) {
        return;
      } else {
        this.fetchFilms();
      }
    }
  }

  addListeners() {
    this.nextButton.addEventListener('click', this.nextPage.bind(this));
    this.prevButton.addEventListener('click', this.prevPage.bind(this));
    this.input.addEventListener('input', this.inputChange.bind(this));
    // window.addEventListener('load', this.fetchFilms.bind(this));
  }

  init() {
    this.fetchDefaultFilms();
    this.addListeners();
  }
}
