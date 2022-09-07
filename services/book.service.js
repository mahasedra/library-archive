import firebase from "../firebase";

const db = firebase.ref("/books");

class BookDataService {
  getAll() {
    return db;
  }

  create(book) {
    return db.push(book);
  }

  update(key, value) {
    return db.child(key).update(value);
  }

  delete(key) {
    return db.child(key).remove();
  }

  deleteAll() {
    return db.remove();
  }
}

export default new BookDataService();
