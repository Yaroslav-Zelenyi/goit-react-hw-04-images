const URL = 'https://pixabay.com/api/';
const KEY = '34063298-757445484d2b824298afb2c65';
const FILTER = '&image_type=photo&orientation=horizontal&per_page=12';

export function getImages(query, page = 1) {
  return fetch(`${URL}?q=${query}&page=${page}&key=${KEY}${FILTER}`).then(
    response => response.json()
  );
}
