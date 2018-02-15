//ogólne ustawienia strony
class MapSetup {
    constructor(){
        this.countryMap = document.querySelector("#map").children;
        this.smallMap = document.querySelector("#mapSec").children;
        this.listOfCountry = document.querySelector("#countryList");
        this.listEl = this.listOfCountry.children;
        this.listSpans = document.querySelectorAll('.countryInfo');
        this.title = document.querySelector("#countryName");
        this.toolTip = document.querySelector("#toolTip");
        this.header = document.querySelector("#header");
        this.btnWeather = document.querySelector(".btnAdd");
        this.boxWeather = document.querySelector("#weatherBox");
        this.btnSearch = document.querySelector("#btn");
        this.list = header.querySelector("ul");
        this.countries = [];
        this.smallCountries = [];
        this.countriesBox = [];
        this.attribute = "";
        this.capital = "";


    }

    createArrayBigMap(){
        return [...this.countryMap].forEach(country => {
            if(typeof country !== 'undefined'){
                this.countries.push({id: country.id, title: country.getAttribute("title")});
                return this.countries
            }    
        })
    }

    createArraySmallMap(){
        return [...this.smallMap].forEach(country => {
            if(typeof country !== 'undefined'){
                this.smallCountries.push({id: country.id, title: country.getAttribute("title")});
                return this.smallCountries
            }    
        })
    }
    // współrzędne myszki -> do wyświetlenie tooltip
    mousePosition(e){                      
        return { x: e.clientX, y: e.clientY }
    } 
    
    // pokazanie danej sekcji
    showSection(section, positionTop){
        section.style.display = 'block';
        section.style.opacity = '1';
        section.style.top = positionTop;
    }
    //schowanie danej sekcji
    hideElement(element){
        element.style.display = 'none';
    }

    //połączenie z APi i porbanie danych wszystkich krajów
    selectCountries(){
        fetch(`https://restcountries.eu/rest/v2/all`)
            .then(res => res.json())
            .then(data => {
               this.countriesBox = data;
            }).catch(error =>{return console.log('fail', error)})

    }
    
    getCapital(){
        this.selectCountries();
        [...this.countriesBox].map(country =>{
            if(this.title.value === country.name){
                 this.capital = country.capital
            }
        })
    }



    // funkcja tworzenie elementu listy
    addItemToList(parent, item, icon){
        let newSpan = document.createElement("span");
        newSpan.classList.add("countryInfo");
        parent.appendChild(newSpan);
        newSpan.innerHTML= icon + item;
       
    }

    // wskazanie danego kraju, wyświetlenie tablicy z informacjami, duża mapa i mała mapa
    viewCountry(e, countriesArrayOne, countriesArrayTwo, input, clickedCountry, countryClass){
        [...countriesArrayOne].forEach(country => {
            let titleOfCountry = country.getAttribute("title");
            if(titleOfCountry === input || titleOfCountry === clickedCountry){
                country.classList.toggle("visibleCountry"); 
            };
        });
        [...countriesArrayTwo].forEach(country => {
                let titleOfCountry = country.getAttribute("title");
                if(titleOfCountry === input || titleOfCountry === clickedCountry){
                    country.classList.add(countryClass); 
                }
            });
    
    }

    // scrollowanie do danej sekcji
    scrollIt(element) {
        window.scrollTo({
            'behavior': 'smooth',
            'top': element.offsetTop
        });
    }


}

export { MapSetup };