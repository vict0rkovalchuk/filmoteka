import $ from 'jquery';
import GenreList from './genreList';
import FilmsByYear from './filmsByYear';

export default class DropdownGenres {
  constructor(genresLink) {
    this.genresLink = genresLink;
  }

  renderGenresDropdown() {
    fetch(this.genresLink)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        let ulGenres = document.querySelector('.genres .dropdown-menu');

        data.genres.forEach(genre => {
          ulGenres.innerHTML += ` <li><a class="dropdown-item" href="#" data-id="${genre.id}">${genre.name}</a></li>`;
        });

        document.querySelectorAll('.dropdown-item').forEach(item => {
          item.addEventListener('click', event => {
            let id;
            id = event.target.dataset.id;

            let newGenreList = new GenreList(
              `https://api.themoviedb.org/3/discover/movie?api_key=fb2d223cbf586b1c9599530eaa26a8db&with_genres=`,
              id
            );
            newGenreList.init();
          });
        });
      })
      .catch(err => alert(err));
  }

  init() {
    this.renderGenresDropdown();
  }
}
