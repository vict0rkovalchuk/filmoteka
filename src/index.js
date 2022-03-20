import './scss/styles.scss';
import './css/bootstrap-reboot.min.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel';
import 'slick-carousel/slick/slick.css';

import PopularFilms from './js/default-page-landing';

let url =
  'https://api.themoviedb.org/3/trending/all/day?api_key=fb2d223cbf586b1c9599530eaa26a8db';
let bgImgLink = `https://image.tmdb.org/t/p/w500/`;

new PopularFilms(url, bgImgLink).init();

// * ID searching
// 'https://api.themoviedb.org/3/movie/551?api_key=fb2d223cbf586b1c9599530eaa26a8db';

{
  /* <div class="item__country">
<span>Испания</span>, <span>Аргентина</span>
</div> */
}

// * Needed
// fetch(
//   'https://api.themoviedb.org/3/genre/movie/list?api_key=fb2d223cbf586b1c9599530eaa26a8db'
// )
//   .then(res => res.json())
//   .then(data => console.log(data));
