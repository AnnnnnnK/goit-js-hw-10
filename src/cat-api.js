import axios from "axios";

const instance = axios.create({
  baseURL: 'https://api.thecatapi.com/v1',
  headers: {'x-api-key': 'live_V85TSSsGlPdM0g6OiuHucrzbUsTFhTuodM7JeCGIdl3NV5F5IMxg03OCh5PxmxeK'}
});


function fetchBreeds() {
  return instance.get('/breeds')
    .then((resp) => 
      
      resp.data
    );
}

function fetchCatByBreed(breedId) {
  return instance.get(`images/search?breed_ids=${breedId}`)
    .then(resp => resp.data[0]);
}

export { fetchBreeds, fetchCatByBreed };


















// const instance = axios.create({
//   baseURL: 'https://api.thecatapi.com/v1',
//   headers: {'x-api-key': 'live_V85TSSsGlPdM0g6OiuHucrzbUsTFhTuodM7JeCGIdl3NV5F5IMxg03OCh5PxmxeK'}
// });



// function fetchBreeds() {
//     return instance.get('/breeds')
//     .then( res => res.data)
//     .catch(err => console.log(err))
// } 


// console.log(fetchBreeds());

// function fetchCatByBreed(breedId) {
//    return instance
//     .get(`/images/search?breed_ids=${breedId}`)
//     .then(response => response.data[0])
//     .catch((err) => console.log(err)
//     );
// }

// export {fetchBreeds, fetchCatByBreed}