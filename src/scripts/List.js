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
        this.btnListExit.addEventListener("click", () => this.hideElement(this.listSection));

        this.toVisitBtn.addEventListener("click", ()=>{
            this.showSection(this.listSection, '120%');
            this.scrollIt(this.listSection);
            this.swichListItem(this.wishList);
            this.viewCountry(event, this.countryMap, this.smallMap, this.title.value, this.attribute, 'notVisited')
            
        });

        this.addVisitedBtn.addEventListener("click", ()=>{
            this.showSection(this.listSection, '120%');
            this.scrollIt(this.listSection);
            this.swichListItem(this.visitedList);
            this.viewCountry(event, this.countryMap, this.smallMap, this.title.value, this.attribute, 'visited')
        })
    }

    swichListItem(parent){
        let country = this.listEl[0].innerText;
        this.addItemToList(parent, country, '' );

        // saveDataToDB(country);
           
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