import { MapSetup } from "./MapSetup";

class Lists extends MapSetup{
    constructor(){
        super();
        this.listSection = document.querySelector(".list__box");
        this.visitedList = document.querySelector("#listVisited");
        this.wishList = document.querySelector("#listWish");
        this.toVisitBtn = document.querySelector("#addToVisit");
        this.addVisitedBtn = this.toVisitBtn.previousElementSibling;
        this.btnListExit = document.querySelector("#exitList");
        this.iconCheck = '<i class="fas fa-check fa-2x"></i>';
        this.btnListExit.addEventListener("click", () => this.hideElement(this.listSection));

        this.toVisitBtn.addEventListener("click", ()=>{
            this.showSection(this.listSection, '120%');
            this.scrollIt(this.listSection);
            this.swichListItem(this.wishList, this.iconCheck);
            this.viewCountry(event, this.countryMap, this.smallMap, this.title.value, this.attribute, 'notVisited');
            this.changeList();
            this.deleteItem();
            
        });

        this.addVisitedBtn.addEventListener("click", ()=>{
            this.showSection(this.listSection, '120%');
            this.scrollIt(this.listSection);
            this.swichListItem(this.visitedList, " ");
            this.viewCountry(event, this.countryMap, this.smallMap, this.title.value, this.attribute, 'visited');
            this.deleteItem();
      
        });


    }

    swichListItem(parent, icon){
        let country = this.listEl[0].innerHTML;
        this.addItemToList(parent, country, icon);
        // saveDataToDB(country);  
    }
    // zmienić funkcję tak, żeby dodawała nowy element!
    changeList(){
        const icons = this.listSection.querySelectorAll('li .fa-check');
        [...icons].forEach( icon=>{
            icon.addEventListener("click", (e)=>{
                let element = e.target.parentElement.innerText;
                this.addItemToList(this.visitedList, element," ")
                e.target.parentElement.innerHTML = " ";
            })
        })
    }

    deleteItem(){
        const deleteIcons = document.querySelectorAll("li .fa-times-circle");
        [...deleteIcons].forEach(icon=>{
            icon.addEventListener("click", (e)=>{
                e.target.parentElement.innerHTML = " ";
            })
        })

    }




// dodanie do listy życzeń
    
//          function saveDataToDB(item, user) {
//             array.push(item);
        
//             database.ref('item').set({
//                 country: array,
    
//             })
//             database.ref('user').set({
//                 user: firebase.auth().currentUser.uid,
    
//             })
//   }
       

}

export { Lists }