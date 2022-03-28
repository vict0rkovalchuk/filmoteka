export default class GetLocalStorage {
  constructor(nameCollection) {
    this.nameCollection = nameCollection;
  }

  getToLocalStorage() {
    console.log(JSON.parse(localStorage.getItem(this.nameCollection)));
  }

  init() {
    this.getToLocalStorage();
  }
}
