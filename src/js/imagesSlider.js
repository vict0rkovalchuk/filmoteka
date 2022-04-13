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
    this.slideIndex = null;
  }

  activeSlide = n => {
    this.imageRef.src = this.slides[n].src;
  };

  nextSlide = () => {
    if (this.slideIndex == this.slides.length - 1) {
      this.slideIndex = 0;
      this.activeSlide(this.slideIndex);
    } else {
      this.slideIndex++;
      this.activeSlide(this.slideIndex);
    }
  };

  prevSlide = () => {
    if (this.slideIndex == 0) {
      this.slideIndex = this.slides.length - 1;
      this.activeSlide(this.slideIndex);
    } else {
      this.slideIndex--;
      this.activeSlide(this.slideIndex);
    }
  };

  ongalleryClick = event => {
    event.preventDefault();

    this.slides = document.querySelectorAll(`.${this.galleryClassName} img`);
    this.arr = Array.from(this.slides);

    if (event.target.nodeName !== 'IMG') {
      return;
    }

    this.modalRef.classList.add('is-open');
    this.imageRef.src = event.target.src;

    {
      this.slideIndex = this.arr.indexOf(event.target);

      this.next.addEventListener('click', this.nextSlide);
      this.prev.addEventListener('click', this.prevSlide);

      window.addEventListener('keydown', event => {
        if (event.code === 'ArrowRight') {
          this.nextSlide();
        }
      });

      window.addEventListener('keydown', event => {
        if (event.code === 'ArrowLeft') {
          this.prevSlide();
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
  };

  addListener() {
    this.gallery.addEventListener('click', this.ongalleryClick);
  }

  init() {
    this.addListener();
  }
}
