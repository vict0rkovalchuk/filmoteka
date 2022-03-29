import './scss/styles.scss';
import './css/bootstrap-reboot.min.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel';
import 'slick-carousel/slick/slick.css';

import PopularFilms from './js/defaultFilms';
import Slider from './js/sliderHeader';
import DropdownGenres from './js/dropdownGenres';
import Searching from './js/search';
import SetLocalStorage from './js/setLocalStorage';
import GetLocalStorage from './js/getLocalStorage';

let API_KEY = 'fb2d223cbf586b1c9599530eaa26a8db';
let weekUrl = `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&page=`;
let bgImgLink = `https://image.tmdb.org/t/p/w500/`;
let filmsByYearLink = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&year=`;

new PopularFilms(weekUrl, bgImgLink, filmsByYearLink).init();

let dayUrl = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`;
new Slider(dayUrl, bgImgLink).init();

let genresLink = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;
new DropdownGenres(genresLink).init();

document.querySelectorAll('.dropdown-toggle').forEach(item => {
  item.addEventListener('click', e => {
    e.target.classList.toggle('toggle-arrow');
  });
});

window.addEventListener('click', e => {
  document.querySelectorAll('.dropdown-toggle').forEach(item => {
    if (e.target !== item) {
      item.classList.remove('toggle-arrow');
    }
  });

  if (
    e.target.classList.contains('net') ||
    e.target.classList.contains('films')
  ) {
    document.querySelector('.library').style.zIndex = '1';
  }

  if (
    e.target.classList.contains('net') ||
    e.target.classList.contains('films') ||
    e.target.classList.contains('header__home')
  ) {
    document
      .querySelectorAll('.genre-name')
      .forEach(item => (item.style.display = 'none'));
    new PopularFilms(weekUrl, bgImgLink, filmsByYearLink).init();
  }

  if (e.target.classList.contains('header__library')) {
    document.querySelector('.library').style.zIndex = '100';
  }

  if (e.target.classList.contains('header__watched')) {
    new GetLocalStorage('watched').init();
  }

  if (e.target.classList.contains('header__queue')) {
    new GetLocalStorage('queue').init();
  }
});

document.querySelectorAll('nav button.btn').forEach((item, index) => {
  item.addEventListener('click', event => {
    event.preventDefault();
    document
      .querySelectorAll('.genre-name')
      .forEach(item => (item.style.display = 'none'));
    let input = document.querySelectorAll('input.form-control');
    new Searching(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${input[index].value}&page=`,
      bgImgLink,
      filmsByYearLink
    ).init();
    input[index].value = '';
  });
});

window.addEventListener('click', e => {
  if (e.target.classList.contains('btn-watched')) {
    new SetLocalStorage('watched', e.target.dataset.id).init();
  } else if (e.target.classList.contains('btn-queue')) {
    new SetLocalStorage('queue', e.target.dataset.id).init();
  }
});
