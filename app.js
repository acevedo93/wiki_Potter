
 /*
 http://hp-api.herokuapp.com/api/characters
 http://hp-api.herokuapp.com/api/characters/students
 http://hp-api.herokuapp.com/api/characters/staff
 http://hp-api.herokuapp.com/api/characters/house
*/

//$2a$10$ezk7lH4S3WhjC1Eq2OTOluo/Aa8TEq7EFwRoOtpXjZcisTxLzUdWy
//https://www.potterapi.com/v1/

((docu) => {
    // API URL.

    Horrocrux = {
        API__module : {
            url :'http://hp-api.herokuapp.com/api/characters',
            key : '$2a$10$ezk7lH4S3WhjC1Eq2OTOluo/Aa8TEq7EFwRoOtpXjZcisTxLzUdWy'
        },
    
        DOMMAGIC : {
            imageClick(){
                let selectImage = Array.prototype.slice.call( docu.getElementsByClassName("__panel__img"));
                selectImage.forEach((element) => {
                    element.addEventListener('click', (e)=>{
                            let fatherId = e.target.parentNode.id
                            let ajax = new XMLHttpRequest();
                           ajax.open ('GET',Horrocrux .API__module.url ,true)
                           ajax.addEventListener('load',(e) => Horrocrux.DOMMAGIC.search(fatherId,ajax))
                           ajax.send(); 
                           Horrocrux.DOMMAGIC.positionMoveImage(fatherId)
                           Horrocrux.DOMMAGIC.showSearch(fatherId)
                        }) 
                },this)
            },
            SearchRadio(){

                let selectCheck =Array.prototype.slice.call( docu.getElementsByName('SEARCH'));
                console.log(selectCheck);
                selectCheck.forEach((element)=>{
                    element.addEventListener('click',(e) =>{
                        //mira el padre el elemento padre del form que trae el id de la casa.
                        //para poder comparar con los resultados 
                        let house =e.target.parentNode.parentNode.id;
                        
                        console.log(element.value);
                        let ajaxSearch = new XMLHttpRequest();
                        ajaxSearch.open('GET','http://hp-api.herokuapp.com/api/characters/'+element.value,true);
                        ajaxSearch.addEventListener('load',(event) => {
                         let ElementsSelected = JSON.parse(ajaxSearch.responseText);
                         ElementsSelected = ElementsSelected.filter((elements) =>elements.house === house)
                         let  selectPanel = Array.prototype.slice.call(docu.getElementsByClassName('container__panel'))
                         let itemsTodelete = docu.getElementById(house).children[2];
                          while(itemsTodelete.firstChild){
                              itemsTodelete.removeChild(itemsTodelete.firstChild);
                          }
                         
                         //while(itemsTodelete.firstChild) { 
                         //   itemsTodelete.removeChild(itemsTodelete.firstChild)
                        //}
                         Horrocrux.DOMMAGIC.charactersToScreen(ElementsSelected);
                        });
                        ajaxSearch.send();
                    });

                })
            },
            search(panelHouse,ajax){
                let infoApiPotter = JSON.parse(ajax.responseText)
                infoApiPotter = infoApiPotter.filter((characters)=>(characters.house === panelHouse))
                Horrocrux.DOMMAGIC.charactersToScreen(infoApiPotter) 
            },
            mouseOut(){
                let selectPanel = Array.prototype.slice.call(docu.getElementsByClassName('container__panel'))
                selectPanel.forEach(function(element){
                    //escucha el evento del mouse
                    element.addEventListener('mouseleave',Horrocrux.DOMMAGIC.removeElements)
                },this)
            },
            removeElements(divPanel){
                //recive el panel del que el mouse salio.
                let deleting = divPanel.target.children[2]
                
                //elimina los personajes 1 a 1
                while(deleting.firstChild) { 
                    deleting.removeChild(deleting.firstChild)
                }
                Horrocrux.DOMMAGIC.hideSearch(divPanel.target.id)
                Horrocrux.DOMMAGIC.positionOriginalImage(divPanel.target.id) 
            },
            positionMoveImage(element){
                let tag = docu.getElementById(element)
                let tagimg = tag.children[1]
                 if(tagimg.classList.contains('img_animation_entrada')) {
                     tagimg.classList.remove('img_animation_entrada') 
                 }  
                 tagimg.classList.add('img_animation_salida')  
            },
            positionOriginalImage(element){
                let loadImg =  docu.getElementById(element).children[1]
                if(loadImg.classList.contains('img_animation_salida')){
                    loadImg.classList.remove('img_animation_salida')
                    loadImg.classList.add('img_animation_entrada')
                }            
            },
            showSearch(element){
                //recive el elemento padre que se le dio clicl
                 let tagSearch = docu.getElementById(element).children[0]
                    tagSearch.classList.remove('__hide__form')       
            },  
            hideSearch(element){
                //recive el elemento del que sale el mouse 
                let tagSearch = docu.getElementById(element).children[0]
                tagSearch.classList.add('__hide__form')   
            },   
            charactersToScreen(infoApiPotter){
                containerHouse = docu.getElementById(infoApiPotter[0].house).children[2]
                infoApiPotter.map(characters => {
                    //creacion de todos los personajes en la pantalla
                    let new_Section_Container = docu.createElement('section')
                    new_Section_Container.classList.add('__grids__character')
                    let new_Article_Image = docu.createElement('article')
                    let new_Image_Tag = docu.createElement('img')
                    new_Image_Tag.src = characters.image
                    new_Article_Image.insertAdjacentElement('beforeend',new_Image_Tag)
                    new_Article_Image.classList.add('__character__img')
                    new_Section_Container.insertAdjacentElement('beforeend',new_Article_Image)
                    let new_Article_Description = docu.createElement('article')
                    let new_p_name = docu.createElement('p')
                    let new_p_gender = docu.createElement('p')
                    let new_p_house = docu.createElement('p')
                    new_p_name.textContent = characters.name
                    new_p_gender.textContent = characters.gender
                    new_p_house.textContent = characters.house
                    new_Article_Description.insertAdjacentElement('beforeend',new_p_name)
                    new_Article_Description.insertAdjacentElement('beforeend',new_p_gender)
                    new_Article_Description.insertAdjacentElement('beforeend',new_p_house)
                    new_Article_Description.classList.add('__character__description')
                    new_Section_Container.insertAdjacentElement('beforeend',new_Article_Description)  
                    // creacion en el container principal del html
                        containerHouse.insertAdjacentElement('beforeend',new_Section_Container)
                }) 
            }
        }
    }   
  
    
       

      //Retorno de clases publicas
    return{
        imageclick : Horrocrux.DOMMAGIC.imageClick(),
        mouseOut : Horrocrux.DOMMAGIC.mouseOut(),
        SearchRadio : Horrocrux.DOMMAGIC.SearchRadio()
      }
    //------------------------------------------
 })(document)


 