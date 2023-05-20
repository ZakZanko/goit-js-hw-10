import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  form: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

refs.form.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
  const name = refs.form.value.trim();
  if (name === '') {
    return (refs.list.innerHTML = ''), (refs.info.innerHTML = '');
  }

  fetchCountries(name)
    .then(countries => {
      refs.list.innerHTML = '';
      refs.info.innerHTML = '';
      if (countries.length === 1) {
        refs.list.insertAdjacentHTML('beforeend', renderList(countries));
        refs.info.insertAdjacentHTML('beforeend', renderInfo(countries));
      } else if (countries.length >= 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name'
        );
      } else {
        refs.list.insertAdjacentHTML('beforeend', renderList(countries));
      }
    })
    .catch(Notiflix.Notify.failure('Oops, there is no country with that name'));
}

function renderList(countries) {
  const markup = countries
    .map(({ name, flags }) => {
      return `
          <li class="country-list__item">
              <img class="country-list__flag" src="${flags.svg}" alt="Flag of ${name.official}" width = 55px height = 35px>
              <h2 class="country-list__name">${name.official}</h2>
          </li>
          `;
    })
    .join('');
  return markup;
}

function renderInfo(countries) {
  const markup = countries
    .map(({ capital, population, languages }) => {
      return `
        <ul class="country-info__list">
            <li class="country-info__item"><p><b>Capital: </b>${capital}</p></li>
            <li class="country-info__item"><p><b>Population: </b>${population}</p></li>
            <li class="country-info__item"><p><b>Languages: </b>${Object.values(
              languages
            ).join(', ')}</p></li>
        </ul>
        `;
    })
    .join('');
  return markup;
}
