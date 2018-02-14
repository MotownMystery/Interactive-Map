import { MapSetup } from "./MapSetup";

//duża mapa i mała mapa

class Map extends MapSetup {
    constructor(){
        super();
        this.sectionSec = document.querySelector("#secondSec");// sekcja z listą info nt krajów
        this.spanList = document.querySelector(".countryInfo");
        this.leftBox = document.querySelector("#leftBox");
        this.title.addEventListener("keyup", e =>{ // wyświetlenie informacji na enter
            if(e.keyCode === 13){
                this.viewCountry(event, this.countryMap, this.smallMap, this.title.value, this.attribute);
                this.selectWeather()
            }

        })
        //wyświetlenie infromacji na click
        this.btnSearch.addEventListener("click", (e)=>{
            this.viewCountry(event, this.countryMap, this.smallMap, this.title.value, this.attribute);
            this.selectWeather()
        }); 
      
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
                this.selectWeather();
                this.showSection(this.sectionSec,'20%');
                this.viewCountry(event, this.countryMap, this.smallMap, this.title.value, this.attribute);

            })
        })
        this.weatherData = [];
        this.weatherList = document.querySelector("#weatherList");
        this.headerWeather = document.querySelector("#titleWeather");
        this.elementWeather = document.querySelectorAll(".elRightList");
        this.timeParagraph = document.querySelector(".time");
        this.img = document.querySelector(".icon");
        this.btnWeather.addEventListener('click', (e) => {
            this.boxWeather.classList.toggle("hide");
            if( e.target.innerText === "Show weather"){
                e.target.innerText = "Hide weather";
            } else {
                e.target.innerText = "Show weather";
            }
            this.scrollIt(this.boxWeather);
            this.selectCountries();
            this.showWeather();
           
        
        });

    }

    // podświetlenie kraju na mapie
      // podświetlenie mapy i pokazanie tooltip z nazwą
    blinkMap(){
        [...this.countryMap].forEach(country => {
            country.addEventListener("mouseenter",(e) =>{
                e.target.classList.add("visibleCountry");
                this.toolTip.innerText = country.getAttribute("title");
                this.title.value = country.getAttribute("title");
    
                this.toolTip.style.display = "block";
                this.toolTip.style.top = this.mousePosition(window.event).y + "px";
                this.toolTip.style.transform = "translate(0,100%)";
                this.toolTip.style.left = this.mousePosition(window.event).x + "px";
            })
            country.addEventListener("mouseleave",(e) =>{
                e.target.classList.remove("visibleCountry");
                this.toolTip.style.display = "none";
                
            })  
        })
    }

    // dodanie infromacji o danym kraju
    selectCountries(attr){
        super.selectCountries();
            [...this.countriesBox].map(country => {
                const {languages, currencies} = country;
                if(this.title.value === country.name || attr === country.name){
                    
                    this.listEl[0].innerText = `Name of the country: ${country.name}`
                    this.listEl[1].innerText = `Capital: ${country.capital}`;

                    [...currencies].forEach(currency=>{
                        this.listEl[2].innerText = `Currency: ${currency.name}`;
                    });
  
                    [...languages].forEach(language =>{
                        this.listEl[3].innerText = `Language: ${ language.name} `;
                    });
                  
                    this.listEl[4].innerText = `Population: ${country.population} `;
                        
                    this.leftBox.style.backgroundImage = `url(${country.flag})`;
                    this.leftBox.classList.add("leftBoxBackground");
                }
            })

    }

    selectWeather(){
        this.getCapital();
        [...this.countriesBox].map(country => {
            if(this.title.value === country.name){
                fetch(`https://api.apixu.com/v1/current.json?key=38d2497fd3b242e78fb182314181601&q=${this.capital}`)
                .then(res => res.json())
                .then(data => {
                    this.weatherData = data;
                }).catch(error => {
                console.log('fail', error);
                })
            }
        })
    }


    showWeather(){
        this.selectWeather();
        [this.weatherData].map( country =>{
            const { location, current } = country;
            this.headerWeather.innerText = `Weather in ${location.name} `  
            this.elementWeather[0].innerText = `Current temperature: ${current.temp_c}`;
            this.elementWeather[1].innerText =  `Feelslike temperature: ${current.feelslike_c} `;
            this.elementWeather[2].innerText =  `Humidity: ${current.humidity} `;
            this.elementWeather[3].innerText =  `Pressure: ${current.pressure_mb} `;
            this.elementWeather[4].innerText =  `Wind km/h: ${current.wind_kph} `;
            this.elementWeather[5].innerText =  ` Weather condition: ${ current.condition.text}`;
                        
          
            this.img.setAttribute("src", current.condition.icon);
            this.timeParagraph.innerText = current.last_updated;

                        
            let newTime = current.last_updated.slice(11, 16);
            if(newTime[0] >= 2 || newTime[0] === '0' && newTime[1] <= 5){
                document.querySelector(".second-page__list--moon").style.display = "block";
                this.boxWeather.classList.add("night");
                            
            } else {
                document.querySelector(".second-page__list--sun").style.display = "block";
                this.boxWeather.classList.add("day");
            }
        })

    }

    // schowanie tablicy tips, wyświetlenie sekcji 2, wyświetlenie informacji o kraju i podświetlenie na mapie
    viewCountry(e, countriesArrayOne, countriesArrayTwo, input, clickedCountry){
        e.preventDefault();
        this.hideElement(this.list);
        this.selectCountries();
        this.showSection(this.sectionSec,'20%');
        super.viewCountry(event, this.countryMap, this.smallMap, this.title.value, this.attribute);
        [...this.countriesBox].forEach(country=>{
            if( this.title.value === country.name){
                this.capital = country.capital;
                this.selectWeather( this.capital);
            }
        })
    }
   // ustawienie guzika search
    // turnOffSearchBtn(){
    //     if(this.sectionSec.style.display !== "none"){
    //         this.btnSearch.setAttribute("disabled", "true");
    //     } else {
    //         this.btnSearch.setAttribute("disabled", "false");
    //     }
    // }


}

export { Map };