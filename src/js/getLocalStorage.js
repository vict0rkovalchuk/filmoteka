export default class GetLocalStorage {
  constructor(nameCollection) {
    this.nameCollection = nameCollection;
    this.ul = document.querySelector('.main .main__populars');
    this.container = document.querySelector('.main .container');
    this.idsCollection = JSON.parse(localStorage.getItem(this.nameCollection));
  }

  fetchCollection() {
    switch (this.idsCollection === null) {
      case true:
        alert('No item here yet');
        break;
      case false:
        document
          .querySelectorAll('.pagination')
          .forEach(item => (item.style.display = 'none'));

        document
          .querySelectorAll('.genre-name')
          .forEach(item => (item.style.display = 'none'));

        this.ul.innerHTML = '';
        this.idsCollection.forEach(id => {
          fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=fb2d223cbf586b1c9599530eaa26a8db`
          )
            .then(res => res.json())
            .then(film => {
              this.renderItem(film);
            })
            .catch(err => alert(err));
        });
        break;

      default:
        break;
    }
  }

  renderItem(film) {
    this.ul.innerHTML += `<li class="item">
    <div class="item__img">
      <img
        src="https://image.tmdb.org/t/p/w500/${film.poster_path}"
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
  <div class="item__title" data-id="${film.id}">${film.original_title}</div>
  <div class="item__info">
    <a href="#main" class="item__releasedata" data-release='${new Date(
      film.release_date
    ).getFullYear()}'><span>${new Date(
      film.release_date
    ).getFullYear()}</span>,&ensp;</a>
    <div class="item__country">
  Rating: ${film.vote_average}/10
    </div>
  </div>
</div>
</li>`;
  }

  init() {
    this.fetchCollection();
  }
}
