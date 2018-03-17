
 /*
 http://hp-api.herokuapp.com/api/characters
 http://hp-api.herokuapp.com/api/characters/students
 http://hp-api.herokuapp.com/api/characters/staff
 http://hp-api.herokuapp.com/api/characters/house
 /* ajax conection */

((docu,ajax) => {
    // API URL.

    piedraFilosofal = {
        API__module : {
            url :' http://hp-api.herokuapp.com/api/characters'
        },
   
        start : {
            imageClick: function (){
                let selectImage = Array.prototype.slice.call( docu.getElementsByClassName("__panel__img"));
                selectImage.forEach(function(element) {
                    element.addEventListener('click', load);  
                }, this);    
            }
        },
    
        DOMMAGIC : {
            removeElements : function (element){
                let tag = docu.getElementById(element);
                let tagimg = tag.children[1]
                return (!tagimg.classList.contains('hideimg')) 
                        ? tagimg.classList.add('hideimg')
                        : tagimg.classList.remove('hideimg');
            },
            charactersToScreen :  function (infoApiPotter){
                containerHouse = docu.getElementById(infoApiPotter[0].house).children[2];
                infoApiPotter.map(characters => {
                     // todos elementos creados se identaron simil a  el html creado,  
                    let new_Section_Container = docu.createElement('section');
                        let new_Article_Image = docu.createElement('article');
                            let new_Image_Tag = docu.createElement('img');
                            new_Image_Tag.src = characters.image;
                        new_Article_Image.insertAdjacentElement('beforeend',new_Image_Tag);
                    new_Section_Container.insertAdjacentElement('beforeend',new_Article_Image);
                        let new_Article_Description = docu.createElement('article');
                            let new_p_name = docu.createElement('p');
                            let new_p_gender = docu.createElement('p');
                            let new_p_house = docu.createElement('p');
                            new_p_name.textContent = characters.name;
                            new_p_gender.textContent = characters.gender;
                            new_p_house.textContent = characters.house;
                        new_Article_Description.insertAdjacentElement('beforeend',new_p_name);
                        new_Article_Description.insertAdjacentElement('beforeend',new_p_gender);
                        new_Article_Description.insertAdjacentElement('beforeend',new_p_house);
                    new_Section_Container.insertAdjacentElement('beforeend',new_Article_Description)  
                    // creacion en el container principal del html
                    containerHouse.insertAdjacentElement('beforeend',new_Section_Container);
                }) 
            }
        
        }
}

    function load (clickInfo){
        let fatherId = clickInfo.target.parentNode.id;
         // llama a la funcion para que cuando cargue la info elimine la imagen
        piedraFilosofal.DOMMAGIC.removeElements(fatherId);
        ajaxCall(fatherId); 
    }

    function ajaxCall(fatherId){
        ajax.open ('GET',piedraFilosofal.API__module.url,true);
        ajax.addEventListener('load',() => search(fatherId));
        ajax.send(); 
    }

    function search (panelHouse){
        if( ajax.status >= 200 && ajax.status < 400  ){
            let infoApiPotter = JSON.parse(ajax.responseText); 
            infoApiPotter = infoApiPotter.filter((characters)=>(characters.house == panelHouse));
            piedraFilosofal.DOMMAGIC.charactersToScreen(infoApiPotter);
        }
        else console.log(ajax.status);      
    }

   


     /**
     * Inicio funcion principal
     */
    piedraFilosofal.start.imageClick();
    //------------------------------------------
 })(document,new XMLHttpRequest());