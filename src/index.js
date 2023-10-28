import { fetchBreeds, fetchCatByBreed } from "./cat-api.js"
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

loader.classList.add('hidden');
error.classList.add('hidden');
select.classList.toggle('hidden');


fetchBreeds()
    .then(arr => {
       const markup = arr.map(({id, name}) => `<option value="${id}">${name}</option>`)
        select.innerHTML = markup;
        select.classList.toggle('hidden');
        loader.classList.toggle('hide');
        new SlimSelect({ select: select });
    })
    .catch(err => console.log(err))



select.addEventListener('change', onChangeSelect);

function onChangeSelect(evt) {
    loader.classList.remove("hidden");
    select.classList.toggle('hidden');
    catInfo.classList.toggle("hidden");
    const catId = evt.target.value;
    fetchCatByBreed(catId)
        .then(data => {
            const { name, description, temperament } = data.breeds[0];
            
            const markup =
                `<img class="cat-img" src="${data.url}" alt="${name}">
               <div class="cat-container"> <h1 class="cat-title">${name}</h1>
                <p class="cat-desc">${description}</p>
                <p class="cat-temperament">${temperament}</p> </div>`;
            
            loader.classList.add("hidden");
            select.classList.toggle('hidden');
            catInfo.classList.toggle("hidden");
            catInfo.innerHTML = markup;
           
        })
    
}



