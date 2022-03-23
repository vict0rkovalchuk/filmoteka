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
      })
      .catch(err => alert(err));
  }

  init() {
    this.renderGenresDropdown();
  }
}
