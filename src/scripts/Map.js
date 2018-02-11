import { MapSetup } from "./MapSetup";


class Map extends MapSetup {
    constructor(){
        super();
        this.sectionSec = document.querySelector("#secondSec");
        this.leftBox = document.querySelector("#leftBox");
        this.title.addEventListener("keyup", e =>{
            if(e.keyCode === 13){
                this.viewCountry(event);
                this.turnOffSearchBtn();
            }

        })

        if(this.sectionSec.style.display !== "none"){
            this.title.addEventListener("input", ()=>{
                // this.resetListElements(this.listSpans)
            })
        }

        this.exit = document.querySelector("#exitBtn");
        this.exit.addEventListener("click", () => {
            this.hideElement(this.sectionSec);
            location.reload();
            this.turnOffSearchBtn();
           
        });
   

        [...this.countryMap].map(country => {
            country.addEventListener("click", e => {
                this.attribute = e.target.getAttribute("title");
                e.preventDefault();
                this.hideElement(this.list);
                this.selectCountries(this.attribute);
                this.showSection(this.sectionSec,'5%');
                this.viewCountry(event, this.countryMap, this.smallMap, this.title.value, this.attribute);

            })
        })



    }
    
    blinkMap(){
        super.blinkMap(this.countryMap);
    }

    selectCountries(attr){
        super.selectCountries();
            [...this.countriesBox].map(country => {
                if(this.title.value === country.name || attr === country.name){
                    const {languages, currencies} = country;
                   
                    this.addItemToList(this.listEl[0], country.name);
                    this.addItemToList(this.listEl[1], country.capital);

                    [...currencies].forEach(currency=>{
                        this.addItemToList(this.listEl[2], currency.name);
                    });
  
                    [...languages].forEach(language =>{
                        this.addItemToList(this.listEl[3], language.name);
                    });
                  
                    this.addItemToList(this.listEl[4], country.population);
                        
                    this.leftBox.style.backgroundImage = `url(${country.flag})`;
                    this.leftBox.classList.add("leftBoxBackground");
                }
            })

    }

    viewCountry(e, countriesArrayOne, countriesArrayTwo, input, clickedCountry){
        e.preventDefault();
        this.hideElement(this.list);
        this.selectCountries();
        this.showSection(this.sectionSec,'5%');
        super.viewCountry(event, this.countryMap, this.smallMap, this.title.value, this.attribute)        
    }

    turnOffSearchBtn(){
        if(this.sectionSec.style.display !== "none"){
            this.btnSearch.setAttribute("disabled", "true");
        } else {
            this.btnSearch.setAttribute("disabled", "false");
        }
    }

    resetListElements(element){
        [...element].forEach(el=>{
            el.innerText = " "
        })

    }
}

export { Map };