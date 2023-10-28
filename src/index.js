import { fetchBreeds, fetchCatByBreed } from "./cat-api.js"

const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

loader.classList.add('hidden');
error.classList.add('hidden');
// select.classList.toggle('hidden');

window.addEventListener("load", (event) => {
    setTimeout(() => select.classList.remove('hidden'),5000)
    // select.classList.remove('hidden');
});
select.addEventListener('change', onChangeSelect);

function onChangeSelect(evt) {
    loader.classList.remove("hidden");
    const catId = evt.target.value;
    fetchCatByBreed(catId)
        .then(data => {
            const { name, description, temperament } = data.breeds[0];
            
            const markup =
                `<img class="cat-img" src="${data.url}" alt="${name}">
        <h1 class="cat-title">${name}</h1>
        <p class="cat-desc">${description}</p>
        <p class="cat-temperament">${temperament}</p>`;
            loader.classList.add("hidden");
            // select.classList.toggle('hidden');
            catInfo.innerHTML = markup;
           
        })
    
}



fetchBreeds()
    .then(arr => {
       const markup = arr.map(({id, name}) => `<option value="${id}">${name}</option>`)
        select.innerHTML = markup;
//         loader.classList.toggle('hidden');
//   select.classList.toggle('hidden');
}).catch(err => console.log(err))


function hideLoading() {
    loader.classList.add("hidden");

    setTimeout(() => {
        loader.classList.remove("hidden");
    }, 5000);
}

function displayLoading() {
    loader.classList.remove("hidden");
}