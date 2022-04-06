export default class Gallery {
  constructor(galleryClassName) {
    this.galleryClassName = galleryClassName;
    this.gallery = document.querySelector(`.${this.galleryClassName}`);
    this.modalRef = document.querySelector('.lightbox');
    this.imageRef = document.querySelector('.lightbox .lightbox__image');
    this.prev = document.querySelector('.lightbox .btn-prev');
    this.next = document.querySelector('.lightbox .btn-next');
    this.btn = document.querySelector('.lightbox .lightbox__button');
    this.overlayRef = document.querySelector('.lightbox .lightbox__overlay');
  }

  ongalleryClick(event) {
    event.preventDefault();

    let slides = document.querySelectorAll(`.${this.galleryClassName} img`);

    let arr = Array.from(slides);

    if (event.target.nodeName !== 'IMG') {
      return;
    }

    this.modalRef.classList.add('is-open');
    this.imageRef.src = event.target.src;

    {
      let slideIndex = arr.indexOf(event.target);

      const activeSlide = n => {
        this.imageRef.src = slides[n].src;
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

      this.next.addEventListener('click', nextSlide);
      this.prev.addEventListener('click', prevSlide);

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
        this.modalRef.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });

    this.overlayRef.addEventListener('click', () => {
      this.modalRef.classList.remove('is-open');
      document.body.style.overflow = '';
    });

    this.btn.addEventListener('click', () => {
      this.modalRef.classList.remove('is-open');
      document.body.style.overflow = '';
    });
    document.body.style.overflow = 'hidden';
  }

  addListener() {
    this.gallery.addEventListener('click', this.ongalleryClick.bind(this));
  }

  init() {
    this.addListener();
  }
}
