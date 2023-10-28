import { fetchBreeds, fetchCatByBreed } from "./cat-api.js"

const select = document.querySelector('.breed-select')

fetchBreeds()
    .then(arr => {
       const murkup = arr.map(({id, name}) => `<option value="${id}">${name}</option>`)
        select.innerHTML = murkup;
}).catch(err => console.log(err))
