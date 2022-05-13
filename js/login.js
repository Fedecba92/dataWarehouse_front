//variables
const form = document.querySelector('.login-form__form');
var url = 'http://localhost:3000/api/auth/login';

console.log(form);


//funciones
const fieldValidator = field => field.length < 1 ? false : true; 

const showError = (node) => {
    node.classList.add('error');
    node.classList.remove('success');
};
const showSuccess = (node) => {
    node.classList.add('success');
    node.classList.remove('error');
}

const submit = (e) => {
    e.preventDefault();

    const data = {
        username:e.target[0].value,
        password:e.target[1].value
    }
    const validationResult = {
        username:fieldValidator(data.username),
        password:fieldValidator(data.password)
    }

    if( validationResult.username && validationResult.password ){

        console.log('enviando datos');
        showSuccess(e.target[0]);
        showSuccess(e.target[1]);

        fetch( url , {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then( response => {

              console.log('server response', response);

              if(response.ok){
                localStorage.setItem('token',response.token);
              }else{
                  console.log(response.error, response.msg);
              }
          })
        
    }else{
        if(!validationResult.username){
            showError(e.target[0]);
        }else{
            showSuccess(e.target[0]);
        }  
        if(!validationResult.password){
            showError(e.target[1]);
        }else{
            showSuccess(e.target[1]);
        } 
    } 
} 

//eventos
form.addEventListener('submit', submit)













// window.addEventListener('load', ()=>{


//     //variables




//     //funciones

    
//     //eventos




// });
