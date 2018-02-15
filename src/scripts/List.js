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
        this.icon = '<i class="fas fa-check fa-2x"></i>';
        this.btnListExit.addEventListener("click", () => this.hideElement(this.listSection));

        this.toVisitBtn.addEventListener("click", ()=>{
            this.showSection(this.listSection, '120%');
            this.scrollIt(this.listSection);
            this.swichListItem(this.wishList, this.icon);
            this.viewCountry(event, this.countryMap, this.smallMap, this.title.value, this.attribute, 'notVisited');
            this.changeList();
            
        });

        this.addVisitedBtn.addEventListener("click", ()=>{
            this.showSection(this.listSection, '120%');
            this.scrollIt(this.listSection);
            this.swichListItem(this.visitedList, " ");
            this.viewCountry(event, this.countryMap, this.smallMap, this.title.value, this.attribute, 'visited');
      
        });


    }

    swichListItem(parent, icon){
        let country = this.listEl[0].innerText;
       
        this.addItemToList(parent, country, icon);
  

        // saveDataToDB(country);  
    }
    // zmienić funkcję tak, żeby dodawała nowy element!
    changeList(){
        const icons = this.listSection.querySelectorAll('span');
        [...icons].forEach( icon=>{
            icon.addEventListener("click", (e)=>{
                let element = e.target.parentElement.innerText;
                this.visitedList.innerHTML = element;
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