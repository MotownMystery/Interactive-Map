import { MapSetup } from "./MapSetup";

//duża mapa i mała mapa

class Map extends MapSetup {
    constructor(){
        super();
        this.sectionSec = document.querySelector("#secondSec");// sekcja z listą info nt krajów
        this.leftBox = document.querySelector("#leftBox");
        this.title.addEventListener("keyup", e =>{ // wyświetlenie informacji na etnter
            if(e.keyCode === 13){
                this.viewCountry(event, this.countryMap, this.smallMap, this.title.value, this.attribute);
                this.turnOffSearchBtn();
            }

        })
        //wyświetlenie infromacji na click
        this.btnSearch.addEventListener("click", (e)=>this.viewCountry(e)); 
      
        // wyjście z sekcji drugiej (lista) i przeładowanie strony
        this.exit = document.querySelector("#exitBtn");
        this.exit.addEventListener("click", () => {
            this.hideElement(this.sectionSec);
            location.reload();
            this.turnOffSearchBtn();
           
        });
   
        // po kliknięciu na kraj na mapie wyświetlenie sekcji 2 z listą
        [...this.countryMap].map(country => {
            country.addEventListener("click", e => {
                this.attribute = e.target.getAttribute("title");
                e.preventDefault();
                this.hideElement(this.list);
                this.selectCountries(this.attribute);
                this.showSection(this.sectionSec,'5%');
                // this.viewCountry(event, this.countryMap, this.smallMap, this.title.value, this.attribute);

            })
        })

    }
    // podświetlenie kraju na mapie
    blinkMap(){
        super.blinkMap(this.countryMap);
    }
    // dodanie infromacji o danym kraju
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
    // schowanie tablicy tips, wyświetlenie sekcji 2, wyświetlenie informacji o kraju i podświetlenie na mapie
    viewCountry(e, countriesArrayOne, countriesArrayTwo, input, clickedCountry){
        e.preventDefault();
        this.hideElement(this.list);
        this.selectCountries();
        this.showSection(this.sectionSec,'5%');
        super.viewCountry(event, this.countryMap, this.smallMap, this.title.value, this.attribute)        
    }
    // ustawienie guzika search
    turnOffSearchBtn(){
        if(this.sectionSec.style.display !== "none"){
            this.btnSearch.setAttribute("disabled", "true");
        } else {
            this.btnSearch.setAttribute("disabled", "false");
        }
    }


}

export { Map };