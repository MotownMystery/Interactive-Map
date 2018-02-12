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
        this.button = document.querySelector(".btnAdd");
        this.btnSearch = document.querySelector("#btn");
        this.list = header.querySelector("ul");
        this.countries = [];
        this.smallCountries = [];
        this.countriesBox = [];
        this.attribute = "";

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
       return fetch(`https://restcountries.eu/rest/v2/all`)
            .then(res => res.json())
            .then(data => {
                data.map(item =>{
                this.countriesBox.push(item);
                return  this.countriesBox;
            })
            }).catch(error =>{return console.log('fail', error)})

    }
    // podświetlenie mapy i pokazanie tooltip z nazwą
    blinkMap(countriesArray){
        [...countriesArray].forEach(country => {
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
    // funkcja tworzenie elementu listy
    addItemToList(parent, item){
        let newSpan = document.createElement("span");
        newSpan.classList.add("countryInfo");
        newSpan.innerText = item;
        parent.appendChild(newSpan);
    }
    // wskazanie danego kraju, wyświetlenie tablicy z informacjami, duża mapa i mała mapa
    viewCountry(e, countriesArrayOne, countriesArrayTwo, input, clickedCountry){
        [...countriesArrayOne].forEach(country => {
            let titleOfCountry = country.getAttribute("title");
            if(titleOfCountry === input || titleOfCountry === clickedCountry){
                country.classList.add("visibleCountry"); 
            }  
        });
        [...countriesArrayTwo].forEach(country => {
            let titleOfCountry = country.getAttribute("title");
            if(titleOfCountry === input || titleOfCountry === clickedCountry){
                country.classList.add("visibleCountry"); 
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