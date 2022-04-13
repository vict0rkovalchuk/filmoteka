export default class SetLocalStorage {
  constructor(nameCollection, id) {
    this.id = id;
    this.nameCollection = nameCollection;
  }

  setToLocalStorage() {
    if (localStorage.getItem(this.nameCollection) === null) {
      localStorage.setItem(this.nameCollection, JSON.stringify([this.id]));
    } else if (localStorage.getItem(this.nameCollection)) {
      let arr = JSON.parse(localStorage.getItem(this.nameCollection));
      arr.push(this.id);
      localStorage.setItem(this.nameCollection, JSON.stringify(arr));
    }
  }

  init() {
    this.setToLocalStorage();
  }
}
