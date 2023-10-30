import { fetchBreeds, fetchCatByBreed } from "./cat-api.js"
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

error.classList.add('hidden');
select.classList.add('hidden');


fetchBreeds()
    .then(arr => {
       const markup = arr.map(({id, name}) => `<option value="${id}">${name}</option>`)
        select.innerHTML = markup;
        select.classList.toggle('hidden');
        loader.classList.toggle('hidden');
        new SlimSelect({ select: select });
    })
    .catch(errorNotify)



select.addEventListener('change', onChangeSelect);

function onChangeSelect(evt) {

    loader.classList.toggle('hidden');
    select.classList.toggle('hidden');
    error.classList.add('hidden');

    catInfo.classList.toggle('hidden');

    const catId = evt.target.value;
    fetchCatByBreed(catId)
        .then(data => {
            const { name, description, temperament } = data.breeds[0];
            
            const markup =
                `<img class="cat-img" src="${data.url}" alt="${name}">
               <div class="cat-container"> <h1 class="cat-title">${name}</h1>
                <p class="cat-desc">${description}</p>
                <p class="cat-temperament">${temperament}</p> </div>`;
            
            loader.classList.add('hidden');
            select.classList.toggle('hidden');
            catInfo.classList.toggle("hidden");
            catInfo.innerHTML = markup;
           
        })
    .catch(errorNotify)
}

function errorNotify() {
  loader.classList.toggle('hidden');
  error.classList.remove('hidden');
  return Notify.failure('Oops! Something went wrong! Try reloading the page!');
}


