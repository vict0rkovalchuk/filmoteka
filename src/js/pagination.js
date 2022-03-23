class News {
  constructor(url) {
    this.url = url;
    this.list = document.querySelector('.list');
    this.prevButton = document.querySelector('#prev');
    this.nextButton = document.querySelector('#next');
    this.input = document.querySelector('input');
    this.span = document.querySelector('.page-amount');
    this.counter = 1;
  }

  fetchNews() {
    let url = this.url + this.counter;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.response.status === 'ok') {
          console.log(data);
          this.renderNews(data.response.results);
          this.renderPagination(data.response);
        }
      })
      .catch(err => alert(err));
  }

  renderNews(arrResults) {
    this.list.innerHTML = '';
    let liCollection = arrResults.map(elem => {
      let li = document.createElement('li');
      let a = document.createElement('a');
      a.setAttribute('href', elem.webUrl);
      a.setAttribute('target', '_blank');
      a.textContent = elem.webTitle;

      li.append(a);
      return li;
    });

    this.list.append(...liCollection);
  }

  renderPagination(response) {
    let { pages, currentPage } = response;
    this.input.setAttribute('max', pages);

    if (this.counter === 1 || this.counter < 1) {
      this.prevButton.setAttribute('disabled', true);
    } else {
      this.prevButton.removeAttribute('disabled');
    }

    if (this.counter === pages || this.counter > pages) {
      this.nextButton.setAttribute('disabled', true);
    } else {
      this.nextButton.removeAttribute('disabled');
    }

    this.span.textContent = pages;
    this.input.value = currentPage;
  }

  nextPage() {
    this.counter += 1;
    this.fetchNews();
    this.input.value = this.counter;
  }

  prevPage() {
    this.counter -= 1;
    this.fetchNews();
    this.input.value = this.counter;
  }

  inputChange(event) {
    let inputValue = event.target.value;

    if (
      (inputValue < this.input.getAttribute('min') ||
        inputValue > this.input.getAttribute('max')) &&
      inputValue
    ) {
      alert(
        `Value must be between ${this.input.getAttribute(
          'min'
        )} and ${this.input.getAttribute('max')}, including them`
      );
    } else {
      this.counter = +inputValue;
    }

    if (!inputValue) {
      return;
    } else {
      if (this.counter < 1) {
        return;
      } else if (this.counter > this.input.getAttribute('max')) {
        return;
      } else {
        this.fetchNews();
      }
    }
  }

  addListeners() {
    this.nextButton.addEventListener('click', this.nextPage.bind(this));
    this.prevButton.addEventListener('click', this.prevPage.bind(this));
    this.input.addEventListener('input', this.inputChange.bind(this));
    window.addEventListener('load', this.fetchNews.bind(this));
  }

  init() {
    this.addListeners();
  }
}

let API_KEY = '3534a47c-f615-488a-ac2b-1cbb3a5481ee';
let url = `https://content.guardianapis.com/search?page-size=20&q=irpin&api-key=${API_KEY}&page=`;

new News(url).init();
