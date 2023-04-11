const BASE_URL = 'https://restcountries.com/v3.1/name';

const fetchCountries = name => {
  const response = fetch(
    `${BASE_URL}/${name}?fields=name,capital,population,flags,languages`
  );
  if (response.status >= 400 && response.status <= 599) {
    return Promise.reject(new Error());
  }
  return response.json();
};

export { fetchCountries };
