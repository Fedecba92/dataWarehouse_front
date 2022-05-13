

const urlRegions ="http://localhost:3000/api/countries/regions";

const getRegions =  (url) =>{
    fetch( url , {
        method: 'GET',
        //body: JSON.stringify(url),
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .catch(error => console.error('Error:', error)).then( response => {

        console.log('server response', response);
})}


document.addEventListener('DOMContentLoaded' , async () => {
    
    //ejecuciones inmediatas
    await getRegions(urlRegions)


});