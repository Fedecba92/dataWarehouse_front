// const orderByName = require("./helpers/operators");

//variables
let dataOrder;
const dashboardContainer = document.querySelector('.table__container');
const alphaOrderByName = document.querySelector('#alpha-order-by-name');
const alphaOrderByCountry = document.querySelector('#alpha-order-by-country');
const alphaOrderByCompany= document.querySelector('#alpha-order-by-company');
const alphaOrderByPosition= document.querySelector('#alpha-order-by-position');
const alphaOrderByInterest = document.querySelector('#alpha-order-by-interest');
const mainCheckbox = document.querySelector('#main-checkbox');
const addContact = document.querySelector('.bar-control__button--add');
const addContactModal = document.querySelector('.contact-add');
const closeAddModalButton = document.querySelector('.contact__close-icon');
const addUserModal = document.querySelector('.wrapper');
const closeAddUserModal = document.querySelector('.user__close-icon');





const urlContacts = 'https://run.mocky.io/v3/305adb06-56ea-4b09-abf5-ef5b4028d9c8';


suma = (num1,num2)=>{
    num1+num2
}

suma(15,15);

//funciones
const getContacts = (url) =>{
    fetch(url)
        .then( resp => resp.json() )
        .then( contacts => {
            printRows(contacts);
            dataOrder = contacts;
        });
}

const orderBy = (arrayContacts, property, direction) => {

    if(direction){
        return arrayContacts.sort(function (a, b) {

            if( typeof property !== 'object'){
                if (a[property].toLowerCase() > b[property].toLowerCase()) {
                    return 1;
                }
                if (a[property].toLowerCase() < b[property].toLowerCase()) {
                    return -1;
                }
            }else{
                if (a[property[0]][property[1]].toLowerCase() > b[property[0]][property[1]].toLowerCase()) {
                    return 1;
                }
                if (a[property[0]][property[1]].toLowerCase() < b[property[0]][property[1]].toLowerCase()) {
                    return -1;
                }
            }    
            // a must be equal to b
            return 0;
          });
    } else{
        return arrayContacts.sort(function (a, b) {

            if( typeof property !== 'object'){
                if (a[property].toLowerCase() < b[property].toLowerCase()) {
                    return 1;
                }
                if (a[property].toLowerCase() > b[property].toLowerCase()) {
                    return -1;
                }
            }else{
                if (a[property[0]][property[1]].toLowerCase() < b[property[0]][property[1]].toLowerCase()) {
                    return 1;
                }
                if (a[property[0]][property[1]].toLowerCase() > b[property[0]][property[1]].toLowerCase()) {
                    return -1;
                }
            }    
            // a must be equal to b
            return 0;
          });
    }
} 

const orderByInterest = (arrayContacts, property, direction) => {
    if(direction){ return arrayContacts.sort((a,b) => b[property] - a[property]);}
    else{
        return arrayContacts.sort((a,b) => a[property] - b[property]);
    }
}

const printRows = (data) =>{
    
    console.log('onPrintRows', data);
    data.forEach( el => {
        
        const preferredChannel = Object.keys(el.preferredChannel);

        const newRow = document.createElement("article");
        newRow.classList.add("table__body--row");

        newRow.innerHTML = `
    
            <div class="table__item"><input class="dash-checkbox checkbox" type="checkbox"></div>
            <div class="table__item"><img src=${el.avatar} alt="Avatar" class="avatar">${ el.name }</div>
            <div class="table__item">${ el.country.name }</div>
            <div class="table__item">${ el.company }</div>
            <div class="table__item">${ el.position }</div>
            <div class="table__item">
                <div class="item__chip">${preferredChannel[0]}</div>
            </div>
            <div class="table__item">
                <span class="item__percent">${el.interest}%</span>
                <div class="meter">
                    <div class="meter__fill"></div>        
                </div>
            </div>
            <div class="table__item table__item--actions">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#5e5e5e"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
                
                <div class="icons-actions">

                    <svg id="contact-delete" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#5e5e5e"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>

                    <svg id="contact-edit" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#5e5e5e"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                
                </div>
            </div>

        `;

        dashboardContainer.appendChild(newRow);

    });

    setCheckboxProperties(); // agarra los checkboxs y les agrega un evento a cada uno para pintarlos
    
    setAnimateBar(data);

}

const cleanDashboard = () => {

    while (dashboardContainer.children.length > 1){
        dashboardContainer.removeChild(dashboardContainer.lastChild);
      }
}

const setAnimateBar = ( data ) => {

    const fills = document.getElementsByClassName('meter__fill');
    const arrayFills = [...fills];
console.log(arrayFills);
    arrayFills.forEach( (fill, i) => {
        fill.style.width =`${ data[i].interest }%`;
        //TODO: trabajar por rangos < >

        if(data[i].interest >= 80 ){
            fill.style.backgroundColor='red'
        }
        else if(data[i].interest >= 70){
            fill.style.backgroundColor ='orange'
        }else if(data[i].interest >= 45){
            fill.style.backgroundColor='yellow'
        }else if(data[i].interest > 0){
            fill.style.backgroundColor='blue'
        }else if(data[i].interest === 0){
            fill.style.backgroundColor='gray'
        }


    });

}

const setCheckboxProperties = async () =>{

    const allCheckbox = document.querySelectorAll('.dash-checkbox');
    const arrayCheckbox = await [ ...allCheckbox ];
    console.log(arrayCheckbox);
    arrayCheckbox.forEach( checkbox => {

        checkbox.addEventListener('change', (e)=>{

            console.log('estados del checkbox', e.target.checked, checkbox.checked);

            if(e.target.checked){
                checkbox.style.backgroundImage = 'url("../../assets/icons/check_box_black_24dp.svg")';
                checkbox.setAttribute('checked','true');
            }else{
                checkbox.style.backgroundImage = 'url("../../assets/icons/check_box_outline_blank_black_24dp.svg")';
                checkbox.setAttribute('checked','false');
            }

            const arrayCheckboxOnfalse = arrayCheckbox.filter(checkbox2 => checkbox2.checked === false );
            console.log(arrayCheckboxOnfalse.length);

            if(!arrayCheckboxOnfalse.length){
                console.log(arrayCheckbox);
                mainCheckbox.style.backgroundImage = 'url("../../assets/icons/check_box_black_24dp.svg")';
                mainCheckbox.setAttribute('checked','true');
                mainCheckbox.setAttribute('indeterminate','false');
            }else if( arrayCheckboxOnfalse.length === arrayCheckbox.length ){
                console.log('entré al del medio',  arrayCheckboxOnfalse.length, arrayCheckbox.length);
                mainCheckbox.style.backgroundImage = 'url("../../assets/icons/check_box_outline_blank_black_24dp.svg")';
                mainCheckbox.setAttribute('checked','false');
                mainCheckbox.setAttribute('indeterminate','false');
            }else if(arrayCheckboxOnfalse.length < arrayCheckbox.length){
                console.log('entré al último')
                mainCheckbox.style.backgroundImage = 'url("../../assets/icons/indeterminate_check_box_black_24dp.svg")';
                mainCheckbox.setAttribute('checked','false');
                mainCheckbox.setAttribute('indeterminate','true');
                console.log(arrayCheckbox.length, arrayCheckboxOnfalse.length);
            }else{
                console.log('no hago nada');
            }

        }, true);

    });


}


const checkAll = (state) => {
    const allCheckbox = document.querySelectorAll('.dash-checkbox');
    const arrayCheckbox = [ ...allCheckbox ];
    
    if(state){
        arrayCheckbox.forEach((element)=>{

            element.setAttribute('checked','true');
            element.style.backgroundImage = 'url("../../assets/icons/check_box_black_24dp.svg")';
            console.log(element.getAttribute('checked'));
        })
    } else{
        arrayCheckbox.forEach((element)=>{
           
            // element.removeAttribute('checked');
            element.setAttribute('checked','false');
            element.style.backgroundImage = 'url("../../assets/icons/check_box_outline_blank_black_24dp.svg")';
            console.log(element.getAttribute('checked'));

        })
    }
    
}


//eventos




    if(document.title === 'Home'){

        alphaOrderByName.addEventListener('click', (e)=>{
            if(!alphaOrderByName.classList.contains('arrows-icon--active')){
                console.log('tiene la clase active');
                alphaOrderByName.classList.add('arrows-icon--active');
                cleanDashboard();
                printRows(orderBy(dataOrder, 'name', true));
            }else{
                alphaOrderByName.classList.remove('arrows-icon--active');
                cleanDashboard();
                printRows(orderBy(dataOrder, 'name', false));
            }
        
        });


        alphaOrderByCountry.addEventListener('click', (e)=>{
            if(!alphaOrderByCountry.classList.contains('arrows-icon--active')){
                console.log('tiene la clase active');
                alphaOrderByCountry.classList.add('arrows-icon--active');
                cleanDashboard();
                printRows(orderBy(dataOrder, ['country','name'], true));
            }else{
                alphaOrderByCountry.classList.remove('arrows-icon--active');
                cleanDashboard();
                printRows(orderBy(dataOrder, ['country','name'], false));
            }
        
        })
        
        
        alphaOrderByCompany.addEventListener('click', (e)=>{
            if(!alphaOrderByCompany.classList.contains('arrows-icon--active')){
                console.log('tiene la clase active');
                alphaOrderByCompany.classList.add('arrows-icon--active');
                cleanDashboard();
                printRows(orderBy(dataOrder, 'company', true));
            }else{
                alphaOrderByCompany.classList.remove('arrows-icon--active');
                cleanDashboard();
                printRows(orderBy(dataOrder, 'company', false));
            }
        
        });
        
        alphaOrderByPosition.addEventListener('click', (e)=>{
            if(!alphaOrderByPosition.classList.contains('arrows-icon--active')){
                console.log('tiene la clase active');
                alphaOrderByPosition.classList.add('arrows-icon--active');
                cleanDashboard();
                printRows(orderBy(dataOrder, 'position', true));
            }else{
                alphaOrderByPosition.classList.remove('arrows-icon--active');
                cleanDashboard();
                printRows(orderBy(dataOrder, 'position', false));
            }
        });
        
        alphaOrderByInterest.addEventListener('click', (e)=>{
            console.log(dataOrder);
            if(!alphaOrderByInterest.classList.contains('arrows-icon--active')){
                console.log('tiene la clase active');
                alphaOrderByInterest.classList.add('arrows-icon--active');
                cleanDashboard();
                printRows(orderByInterest(dataOrder, 'interest', true));
            }else{
                alphaOrderByInterest.classList.remove('arrows-icon--active');
                cleanDashboard();
                printRows( orderByInterest(dataOrder, 'interest', false));
            }
        });
        
        mainCheckbox.addEventListener('click', (e) => {
        
        
            //TODO: ver este state git
            console.log(e.target.checked);
            if(e.target.checked){
                mainCheckbox.style.backgroundImage = 'url("../../assets/icons/check_box_black_24dp.svg")';
                checkAll(true)
            }
            else{
                mainCheckbox.style.backgroundImage = 'url("../../assets/icons/check_box_outline_blank_black_24dp.svg")';
                checkAll(false)
            }
        });



        closeAddModalButton.addEventListener('click', ()=>{
            addContactModal.style.display = 'none';
        });
    }



addContact.addEventListener('click', ()=>{
    if(document.title == "Home"){
         addContactModal.style.display = 'flex';
    }else if(document.title == "Users"){
        addUserModal.style.display = 'flex';
    }
   
});



closeAddUserModal.addEventListener('click', ()=>{
    addUserModal.style.display = 'none';
});


document.addEventListener('DOMContentLoaded' , async () => {
    
    //ejecuciones inmediatas
    await getContacts(urlContacts);


});


console.log('ejecución');







