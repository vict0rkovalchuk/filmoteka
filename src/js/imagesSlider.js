export default class Gallery {
  constructor() {
    this.refs = {
      gallery: document.querySelector('.fotorama-slider'),
      modalRef: document.querySelector('.lightbox'),
      imageRef: document.querySelector('.lightbox__image'),
      prev: document.querySelector('.btn-prev'),
      next: document.querySelector('.btn-next'),
      overlayRef: document.querySelector('.lightbox__overlay'),
      btn: document.querySelector('.lightbox__button')
    };
  }

  addListener() {
    this.refs.gallery.addEventListener('click', ongalleryClick);

    function ongalleryClick(event) {
      event.preventDefault();

      let slides = document.querySelectorAll('.fotorama-slider img');
      let arr = Array.from(slides);

      if (event.target.nodeName !== 'IMG') {
        return;
      }

      document.querySelector('.lightbox').classList.add('is-open');
      document.querySelector('.lightbox__image').src = event.target.src;

      {
        let slideIndex = arr.indexOf(event.target);

        const activeSlide = n => {
          document.querySelector('.lightbox__image').src = slides[n].src;
        };

        const nextSlide = () => {
          if (slideIndex == slides.length - 1) {
            slideIndex = 0;
            activeSlide(slideIndex);
          } else {
            slideIndex++;
            activeSlide(slideIndex);
          }
        };

        const prevSlide = () => {
          if (slideIndex == 0) {
            slideIndex = slides.length - 1;
            activeSlide(slideIndex);
          } else {
            slideIndex--;
            activeSlide(slideIndex);
          }
        };

        document
          .querySelector('.btn-next')
          .addEventListener('click', nextSlide);
        document
          .querySelector('.btn-prev')
          .addEventListener('click', prevSlide);

        window.addEventListener('keydown', event => {
          if (event.code === 'ArrowRight') {
            nextSlide();
          }
        });

        window.addEventListener('keydown', event => {
          if (event.code === 'ArrowLeft') {
            prevSlide();
          }
        });
      }

      window.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
          document.querySelector('.lightbox').classList.remove('is-open');
          document.body.style.overflow = '';
        }
      });

      document
        .querySelector('.lightbox__overlay')
        .addEventListener('click', () => {
          document.querySelector('.lightbox').classList.remove('is-open');
          document.body.style.overflow = '';
        });

      document
        .querySelector('.lightbox__button')
        .addEventListener('click', () => {
          document.querySelector('.lightbox').classList.remove('is-open');
          document.body.style.overflow = '';
        });
      document.body.style.overflow = 'hidden';
    }
  }
}
