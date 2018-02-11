
class MapSetup {
    constructor(){
        this.countryMap = document.querySelector("#map").children;
        this.smallMap = document.querySelector("#mapSec").children;
        this.listOfCountry = document.querySelector("#countryList");
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

    mousePosition(e){
        return window.onmousemove = function(e){
           return { x: e.clientX, y: e.clientY }
        }
    } 
    

    showSection(section, positionTop){
        section.style.display = 'block';
        section.style.opacity = '1';
        section.style.top = positionTop;
    }

    hideElement(element){
        element.style.display = 'none';
    }


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

    blinkMap(countriesArray){
        [...countriesArray].forEach(country => {
            country.addEventListener("mouseenter",(e) =>{

                e.target.classList.add("visibleCountry");
                this.toolTip.innerText = country.getAttribute("title");
                this.title.innerText = country.getAttribute("title");
    
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

    addItemToList(parent, item, text){
        let newLi = document.createElement("li");
        newLi.classList.add("elInfo");
        newLi.innerText = text + item;
        parent.appendChild(newLi);
    }
    
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

    scrollIt(element) {
        window.scrollTo({
            'behavior': 'smooth',
            'top': element.offsetTop
        });
    }


}

export { MapSetup };