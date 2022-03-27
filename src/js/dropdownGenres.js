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
          document
            .querySelector('.main .container')
            .insertAdjacentHTML(
              'afterbegin',
              `<div class="genre-name genre-name-${genre.id}"><h3>${genre.name}</h3></div>`
            );
          document.querySelector('.main .container').insertAdjacentHTML(
            'beforeend',
            ` <div class="pagination pagination${genre.id}">
          <div>
           <a href="#main"> <button
           id="genre-prev"
           type="button"
           class="btn btn-outline-success"
         >
           Prev
         </button></a>
            <input
              class="form-control me-2"
              type="number"
              name="pageNumber"
              id=""
              min="1"
            />
            <span> of&ensp;</span>
            <span class="page-amount"></span>
           <a href="#main"> <button
           id="genre-next"
           type="button"
           class="btn btn-outline-success"
         >
           Next
         </button></a>
          </div>
        </div>`
          );
          ulGenres.innerHTML += ` <li><a class="dropdown-item" href="#" data-id="${genre.id}">${genre.name}</a></li>`;
        });

        document.querySelectorAll('.dropdown-item').forEach(item => {
          // console.log(document.querySelectorAll('.pagination'));
          item.addEventListener('click', event => {
            let id;
            id = event.target.dataset.id;

            let newGenreList = new GenreList(
              `https://api.themoviedb.org/3/discover/movie?api_key=fb2d223cbf586b1c9599530eaa26a8db&with_genres=`,
              id,
              `https://image.tmdb.org/t/p/w500/`
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
