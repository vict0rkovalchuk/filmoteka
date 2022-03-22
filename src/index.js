import './scss/styles.scss';
import './css/bootstrap-reboot.min.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel';
import 'slick-carousel/slick/slick.css';

import PopularFilms from './js/defaultFilms';
import Slider from './js/sliderHeader';
import DropdownGenres from './js/dropdownGenres';

let API_KEY = 'fb2d223cbf586b1c9599530eaa26a8db';
let weeksUrl = `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`;
let bgImgLink = `https://image.tmdb.org/t/p/w500/`;
let filmsByYearLink = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&year=`;

new PopularFilms(weeksUrl, bgImgLink, filmsByYearLink).init();

let dayUrl = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`;
new Slider(dayUrl, bgImgLink).init();

let genresLink = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;
new DropdownGenres(genresLink).init();

// * ID searching
// 'https://api.themoviedb.org/3/movie/551?api_key=fb2d223cbf586b1c9599530eaa26a8db';

{
  /* <div class="item__country">
<span>Испания</span>, <span>Аргентина</span>
</div> */
}
