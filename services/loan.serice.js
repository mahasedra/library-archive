import firebase from "../firebase";

const db = firebase.ref("/loans");

class LoanDataService {
    getAll() {
        return db;
    }

    create(loan) {
        return db.push(loan);
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

export default new LoanDataService();
