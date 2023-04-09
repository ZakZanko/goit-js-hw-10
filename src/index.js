import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
  form: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

form.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
  const name = form.value.trim();
  if (name === '') {
    return (list.innerHTML = ''), (info.innerHTML = '');
  }
}
