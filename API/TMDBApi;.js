// API/TMDBApi.js

const API_TOKEN = "VOTRE_TOKEN_ICI";

export function getFilmsFromApiWithSearchedText (text) {
  const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text
  
}