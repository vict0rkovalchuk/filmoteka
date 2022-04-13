import $ from 'jquery';

let releaseData = null;

export default class FilmsByYear {
  constructor(filmsByYearLink, bgImgLink) {
    this.url = filmsByYearLink;
    this.bgImgLink = bgImgLink;
    this.list = document.querySelector('.main .main__populars');
    this.prevButton = document.querySelector('#year-prev');
    this.nextButton = document.querySelector('#year-next');
    this.input = document.querySelector('.pagination input');
    this.span = document.querySelector('.page-amount');
    this.counter = 1;
  }

  fetchDefaultFilms() {
    document.querySelectorAll('.item__releasedata').forEach(item => {
      item.addEventListener('click', event => {
        document
          .querySelectorAll('.genre-name')
          .forEach(item => (item.style.display = 'none'));
        releaseData = event.currentTarget.dataset.release;
        this.fetchFilms(this.url, releaseData, this.counter);
      });
    });
  }

  fetchFilms(url, releaseData, counter) {
    fetch(`${url + releaseData}&page=${counter}`)
      .then(res => res.json())
      .then(data => {
        this.list.innerHTML = '';
        this.renderFilms(data.results);
        document
          .querySelectorAll('.pagination')
          .forEach(item => (item.style.display = 'none'));
        $('.pagination-year').css('display', 'block');
        this.renderPagination(data);
      })
      .catch(err => alert(err));
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
    this.fetchFilms(
      `https://api.themoviedb.org/3/discover/movie?api_key=fb2d223cbf586b1c9599530eaa26a8db&year=`,
      releaseData,
      this.counter
    );
    this.input.value = this.counter;
  }

  prevPage() {
    this.counter -= 1;
    this.fetchFilms(
      `https://api.themoviedb.org/3/discover/movie?api_key=fb2d223cbf586b1c9599530eaa26a8db&year=`,
      releaseData,
      this.counter
    );
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
        this.fetchFilms(
          `https://api.themoviedb.org/3/discover/movie?api_key=fb2d223cbf586b1c9599530eaa26a8db&year=`,
          releaseData,
          this.counter
        );
      }
    }
  }

  addListeners() {
    this.nextButton.addEventListener('click', this.nextPage.bind(this));
    this.prevButton.addEventListener('click', this.prevPage.bind(this));
    this.input.addEventListener('input', this.inputChange.bind(this));
  }

  init() {
    this.addListeners();
  }
}

new FilmsByYear().init();
