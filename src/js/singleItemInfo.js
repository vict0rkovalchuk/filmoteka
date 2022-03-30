export default class SingleItemInfo {
  constructor(aboutFilmLink, imagesLink) {
    this.aboutFilmLink = aboutFilmLink;
    this.imagesLink = imagesLink;
    this.list = document.querySelector('.main .main__populars');
    this.about = document.querySelector('.about');
    this.h4 = document.querySelector('.about h4');
    this.img = document.querySelector('.main__filminfo-poster .img img');
    this.overview = document.querySelector(
      '.main__filminfo-overview .overview'
    );
    this.fotorama = document.querySelector(
      '.main__filminfo-overview .fotorama-slider'
    );
    this.genreList = document.querySelector(
      '.main__filminfo-about ul.main__filminfo-genres'
    );
    this.year = document.querySelector(
      '.main__filminfo-descr .main__filminfo-releasedata span'
    );
    this.revenue = document.querySelector(
      '.main__filminfo-descr .main__filminfo-revenue span'
    );
    this.runtime = document.querySelector(
      '.main__filminfo-descr .main__filminfo-runtime span'
    );
    this.tagline = document.querySelector(
      '.main__filminfo-descr .main__filminfo-tagline span'
    );
  }

  fetchAboutFilmInfo() {
    fetch(this.aboutFilmLink)
      .then(res => res.json())
      .then(data => {
        this.h4.textContent = data.original_title;
        this.img.src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
        this.img.alt = `${data.original_title}`;
        this.overview.textContent = data.overview;
        this.genreList.innerHTML = '';
        data.genres.forEach(item => {
          this.genreList.innerHTML += `<li class="item">${item.name}</li>`;
        });
        this.year.textContent = new Date(data.release_date).getFullYear();
        this.revenue.textContent = data.revenue;
        this.runtime.textContent = `${data.runtime}min`;
        this.tagline.textContent = data.tagline;
      })
      .catch(err => alert(err));
  }

  fetchFilmImages() {
    fetch(this.imagesLink)
      .then(res => res.json())
      .then(data => {
        this.fotorama.textContent = '';
        data.backdrops.splice(0, 12).forEach(item => {
          this.fotorama.innerHTML += `<img src="https://image.tmdb.org/t/p/w500${item.file_path}" />`;
        });
      })
      .catch(err => alert(err));
  }

  init() {
    this.about.style.display = 'block';
    this.list.innerHTML = '';
    this.fetchAboutFilmInfo();
    this.fetchFilmImages();
  }
}
