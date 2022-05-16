const API_URL = "http://127.0.0.1:8000/api/"
const ENDPOINT = "lecteurs/"
export function getAllLecteurs(text = '', page = '') {
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
export function createLecteur(name) {
    return fetch(API_URL + ENDPOINT, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nom: name,
        })
    })
        .then((response) => response.json())
        .catch((error) => console.error(error));
}
export function getLecteur(id) {
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
export function deleteLecteur(id) {
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
export function updateLecteur(id, name) {
    return fetch(API_URL + ENDPOINT + id, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nom: name,
        })
    })
        .then((response) => response.json())
        .catch((error) => console.error(error))
}