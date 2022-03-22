export default class PopularFilms {
  constructor(weekUrl, bgImgLink, filmsByYearLink) {
    this.weekUrl = weekUrl;
    this.bgImgLink = bgImgLink;
    this.counter = 1;
    // this.filmsByYearLink = filmsByYearLink;
  }

  renderFilmsPage() {
    fetch(this.weekUrl + this.counter)
      .then(res => res.json())
      .then(data => {
        let ul = document.querySelector('.main .main__populars');

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
      </div>
      <div class="item__descr">
        <div class="item__title">${movieTitle}</div>
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
    </li>`;
        });
        ul.insertAdjacentHTML(
          'beforeend',
          `<div class="button-item"><button type="button" class="btn btn-outline-success">Load 20 more</button></div>`
        );
        this.loadMoreFilms();
        // this.renderFilmsByYear();
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
                </div>
                <div class="item__descr">
                  <div class="item__title">${movieTitle}</div>
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
          })
          .catch(err => alert(err));
      });
  }

  // renderFilmsByYear() {
  //   document.querySelectorAll('.item__releasedata').forEach(item => {
  //     item.addEventListener('click', event => {
  //       fetch(
  //         `https://api.themoviedb.org/3/discover/movie?api_key=fb2d223cbf586b1c9599530eaa26a8db&year=${event.currentTarget.dataset.release}`
  //       )
  //         .then(res => res.json())
  //         .then(data => {
  //           console.log(this.url);
  //           console.log(data);
  //           let ul = document.querySelector('.main .main__populars');
  //           ul.innerHTML = '';
  //           data.results.forEach(film => {
  //             let movieTitle;
  //             let movieReleaseData;
  //             film.original_title
  //               ? (movieTitle = film.original_title)
  //               : (movieTitle = film.original_name);
  //             film.release_date
  //               ? (movieReleaseData = film.release_date)
  //               : (movieReleaseData = film.first_air_date);
  //             ul.innerHTML += `<li class="item">
  //             <div class="item__img">
  //               <img
  //                 src="${this.bgImgLink + film.poster_path}"
  //                 alt="img"
  //               />
  //             </div>
  //             <div class="item__descr">
  //               <div class="item__title">${movieTitle}</div>
  //               <div class="item__info">
  //                 <div class="item__releasedata" data-release='${new Date(
  //                   movieReleaseData
  //                 ).getFullYear()}'>${new Date(
  //               movieReleaseData
  //             ).getFullYear()},&ensp;</div>
  //                 <div class="item__country">
  //               Rating: ${film.vote_average}/10
  //                 </div>
  //               </div>
  //             </div>
  //           </li>`;
  //           });
  //           document.querySelector(
  //             '.main .container'
  //           ).innerHTML += `<div class="pagination">
  //           <button id="prev">Prev</button>
  //           <input type="number" name="pageNumber" id="" min="1" />
  //           <span> of </span>
  //           <span class="page-amount"></span>
  //           <button id="next">Next</button>
  //         </div>`;
  //         })
  //         .catch(err => alert(err));
  //     });
  //   });
  // }

  init() {
    this.renderFilmsPage();
  }
}