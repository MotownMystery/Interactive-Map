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

        this.btnSearch.addEventListener("click", e =>{
            this.viewCountry(event);
            this.turnOffSearchBtn();
        })

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
                this.showSection(this.sectionSec,'20%');
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
                   
                    this.addItemToList(this.listOfCountry, country.name, 'Name of the country: ');
                    this.addItemToList(this.listOfCountry, country.capital, 'Capital: ');

                    [...currencies].forEach(currency=>{
                        this.addItemToList(this.listOfCountry, currency.name, 'Currency: ');
                    });
  
                    [...languages].forEach(language =>{
                        this.addItemToList(this.listOfCountry, language.name, 'Language: ');
                    });
                  
                    this.addItemToList(this.listOfCountry, country.population, 'Population: ');
                        
                    this.leftBox.style.backgroundImage = `url(${country.flag})`;
                    this.leftBox.classList.add("leftBoxBackground");
                }
            })

    }

    viewCountry(e, countriesArrayOne, countriesArrayTwo, input, clickedCountry){
        e.preventDefault();
        this.hideElement(this.list);
        this.selectCountries();
        this.showSection(this.sectionSec,'20%');
        super.viewCountry(event, this.countryMap, this.smallMap, this.title.value, this.attribute)        
    }

    turnOffSearchBtn(){
        if(this.sectionSec.style.display !== "none"){
            this.btnSearch.setAttribute("disabled", "true");
        } else {
            this.btnSearch.setAttribute("disabled", "false");
        }
    }

}

export { Map };