const API_URL = "http://127.0.0.1:8000/api/"
const ENDPOINT = "livres/"
export function getAllLivres(text = '', page = '') {
    return fetch(API_URL + ENDPOINT, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.json())
        .catch((error) => console.error(error))
}
export function createLivre(design, autor, date_edition, available = true) {
    return fetch(API_URL + ENDPOINT, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            design: design,
            auteur: autor,
            dateEdition: date_edition,
            disponible: available
        })
    })
        .then((response) => response.json())
        .catch((error) => console.error(error));
}
export function getLivre(id) {
    return fetch(API_URL + ENDPOINT + id, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.json())
        .catch((error) => console.error(error))
}
export function deleteLivre(id) {
    return fetch(API_URL + ENDPOINT + id, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.json())
        .catch((error) => console.error(error))
}
export function updateLivre(id, design, autor, date_edition, available) {
    return fetch(API_URL + ENDPOINT + id, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            design: design,
            auteur: autor,
            dateEdition: date_edition,
            disponible: available
        })
    })
        .then((response) => response.json())
        .catch((error) => console.error(error))
}