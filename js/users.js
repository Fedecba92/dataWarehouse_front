window.addEventListener('load',()=>{

    const newUserForm = document.getElementById('new-user-form');
    const name = document.getElementById('name');
    const rol = document.getElementById('rol');
    const email = document.getElementById('email');
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const password2 = document.getElementById('repPassword');
    const url = 'http://localhost:3000/api/auth/new';

    //funciones

    //TODO: username y password solo puede ser números y letras

    const formatField = {
        passRange:function(value){
            return (value.length >= 3 && value.length <= 255) ? true : false
        },
        justLetter:function(value){
            const regex = /^[a-zA-Z\s]*$/;
            return regex.test(value);
        },
        justAlphanumeric: function(value) {
            const regex = /^[0-9a-zA-Z]+$/;
            return regex.test(value);    
        }
    }    

    const getFieldName = (input) => {
        let name = input.name;
        return name.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))); 
    }
    
    const showError = (input, message) => {
        const formControl = input.parentElement;
        input.classList.add('error');
        input.removeAttribute('placeholder');
        formControl.children[2].style.display ='block';
        formControl.children[2].innerText = message;
    }
    
    const showSuccess = (input) => {
        const formControl = input.parentElement;
        input.classList.remove('error');
        formControl.children[2].style.display ='none';
    }

    const checkRequired = (inputArr) => {

        inputArr.forEach( input => {
            if(input.value.trim() === '') {
                showError(input, `${getFieldName(input)} cannot be empty`);
            } else {
                showSuccess(input);
            }
        });
    }
        
    function checkEmail(input) {
        if(input.value.trim() !== ''){
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (re.test(input.value.trim())) {
                showSuccess(input);
            } else {
                showError(input, 'Email is not valid');
                input.value = "email@example/com";
            }
        }
      }

    //checkear passwords 
    function checkPass( password, password2 ){
        if(password.value.trim() === password2.value.trim()){
            showSuccess(password2);
        } else if(password2.value.trim()!=='') {
            showError(password2, 'Password not match');
        }
    }

    function checkPassRange(values){
        values.forEach(el => {
            
            if( formatField.passRange(el.value) ){
                showSuccess(el);
            } else {
                showError(el, 'La contraseña no puede tener menos de 3 caracteres o más de 255 caracteres');
            }
        });
    }

    function checkAlphanumeric(inputs) {

        inputs.forEach( input => {
            if (formatField.justAlphanumeric(input.value.trim())) {
                showSuccess(input);
            } else {
                showError(input, 'Solo letras y números');
            }
        });
    }

    function checkJustLetter(input) {
        if (formatField.justLetter(input.value.trim()) 
                && input.value.trim() !=='') {
            showSuccess(input);
        } else {
            showError(input, 'Name no válido');
        }
    }
    
    


    function checkError(array) {
        return array.find( input => input.className.includes('error')) ? false : true;
    }





    //eventos
    newUserForm.addEventListener('submit', e => {
        e.preventDefault();
        checkJustLetter(name);
        checkRequired([name, rol, email, username, password, password2]);
        checkEmail(email);
        checkPassRange([password, password2]);
        checkPass( password, password2 );
        checkAlphanumeric([username, password ]);
        
        //TODO: Hacer una función que recorra todos los campos y que compruebe si tienen una clase de error, si es así no hacer nada
        //pero si todos los campos no tienen la clase de error, entonces hacer el fetch al server. 
        
        if(checkError([ name, rol, email, username, password, password2 ])){
            console.log('entrando al fetch');
            const data = {
                name: name.value.trim(),
                username: username.value.trim(),
                roleId: rol.value.trim(),
                email: email.value.trim(),
                password: password.value.trim(),
                phone:'+5493518997788'
            }

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
              })

        }else{
            console.log('ejecutando con errores');
        }


    });
});