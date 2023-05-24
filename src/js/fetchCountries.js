const fields = 'fields=name,capital,population,flags,languages';
const BASE_URL = 'https://restcountries.com/v3.1/name/';

function fetchCountries(name) {
  return fetch(`${BASE_URL}${name}?${fields}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
export { fetchCountries };
// function fetchCountries(name) {
//   return fetch(`${BASE_URL}${name}?${fields}`)
//     .then(response => response.json())
//     .catch(error => console.log(error));
// }
