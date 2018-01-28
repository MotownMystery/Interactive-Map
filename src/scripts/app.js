document.addEventListener("DOMContentLoaded", function(){
    
    
        //firebase interactive-map
        const config = {
            apiKey: "AIzaSyAdWKgrquitVPYVZaieV2ZZFJKC95Iel98",
            authDomain: "interactive-map-f5060.firebaseapp.com",
            databaseURL: "https://interactive-map-f5060.firebaseio.com",
            projectId: "interactive-map-f5060",
            storageBucket: "interactive-map-f5060.appspot.com",
            messagingSenderId: "595861650630"
          };
        firebase.initializeApp(config);
        const database = firebase.database();
    
        //elementy do logowania
        const logIn = document.getElementById("logIn");
        const signIn = document.getElementById("signIn");
        const logOut = document.getElementById("logOut");
        const btnSendSign = document.getElementById("sendSignIn");
        const btnSendLog = document.getElementById("sendLogIn");
        const form = document.getElementById("signInForm");
        const array = [];
       
        //pokaz formularz do logowania
      
        // logOut.classList.add("hide");
        logIn.addEventListener("click", e =>{
            document.getElementById('logInForm').style.display = "block";
           
        });
    
        //wylogowanie sie uzytkownika
    
        logOut.addEventListener("click", e => {
            firebase.auth().signOut()
        })
        //pokaz formularz do rejestracji
        signIn.addEventListener("click", e => {
            document.getElementById('signInForm').style.display = "block";
        });
        
        //zalogowanie uzytkownika
      
        btnSendLog.addEventListener("click", e => {
            e.preventDefault();
            const passw = document.getElementById("password").value;
            const email = document.getElementById("email").value
            const auth = firebase.auth();
    
            const promise = auth.signInWithEmailAndPassword(email, passw);
            promise.catch(e => console.log(e.message));
    
     
        })
    
        //rejestracja nowego uzytkownika
        btnSendSign.addEventListener("click", e => {
            e.preventDefault();
            const passw = document.getElementById("password").value;
            const email = document.getElementById("email").value;
            const auth = firebase.auth();
    
            const promise = auth.createUserWithEmailAndPassword(email, passw);
            promise.catch(e => console.log(e.message));
    
        })
    
    
        firebase.auth().onAuthStateChanged(function(user){
            if(user){   
                console.log(user + "logged in" + firebase.auth().currentUser.uid);
                logOut.classList.remove("hide");
            } else {
                console.log('not logged in');
                logOut.classList.add("hide");
            }
        })
    
        //zmienne
        let img = document.querySelector("#map");
        let countryMap = img.querySelectorAll("path");
        let imgSmall = document.querySelector("#mapSec");
        let smallMap = imgSmall.querySelectorAll("path");
        let title = document.querySelector("#countryName");
        let toolTip = document.querySelector("#toolTip");
        let header = document.querySelector("#header");
    
        let btn = document.querySelector("#btn");
        let tips = document.querySelector("#tipBtn");
        let listBtn = btn.previousElementSibling;
    
    
        let list = header.querySelector("ul");
        let sectionSec = document.querySelector("#secondSec");
        let apiKeyWet = 'f4779c85f173bc69a529ddd3ab6e9770';
        let apiKeyTime = 'ALQA70H88TB7';
        let exit = document.querySelector("#exitBtn");
 
        let boxWeather = document.querySelector("#weatherBox");
        // let countryInfo = document.querySelector("#countryList");
        let sun = document.querySelector("#sun");
        let moon = document.querySelector("#moon");
        let littleMoon = document.querySelector("#littleMoon");
        let location = null;
        let country = null;
        let dataCountry = null;
       
        let listSection = document.querySelector(".list__box");
        let visitedList = document.querySelector("#listVisited");
        let wishList = document.querySelector("#listWish");
        let visitBtn = document.querySelector("#addToVisit");
        let addVisitedBtn = visitBtn.previousElementSibling;
    
    

    
        // tablica obiektow kraje id i nazwy
        let countries = []
    
        countryMap.forEach(country => {
            if(typeof country !== ''){
                countries.push({id: country.id, title: country.getAttribute("title")});
                return countries;
            }
           
            
        })
    
        //small map - podswietlenie wybranego kraju
        let smallCountries = []
        
            smallMap.forEach(country => {
                if(typeof country !== ''){
                    smallCountries.push({id: country.id, title: country.getAttribute("title")});

                    return smallCountries;
                }
                 
        })
    
        //pozycja kursora
        window.onmousemove = mousePosition;
        function mousePosition(e){
            return { x: e.clientX, y: e.clientY };  
        }  
    
        //najechanie na mape i podswietlenie
        countryMap.forEach(country => {
            country.addEventListener("mouseenter", function(){
                this.classList.add("visibleCountry");
                toolTip.innerText = country.getAttribute("title");
                title.innerText = country.getAttribute("title");
    
                toolTip.style.display = "block";
                toolTip.style.top = mousePosition(window.event).y + "px";
                toolTip.style.transform = "translate(0,100%)";
                toolTip.style.left = mousePosition(window.event).x + "px";
      
            })
    
            country.addEventListener("mouseleave", function(){
                this.classList.remove("visibleCountry");
                toolTip.style.display = "none";
                
            })
            
     
        })
    
        //widocznosc sekcji
    
        function showSection(section, positionTop){
            section.style.display = 'block';
            section.style.opacity = '1';
            section.style.top = positionTop;
        }
    
        //funkcja chowająca element 
        function hideElement(element){
            element.style.display = 'none';
        }
        
       
        //pobranie inputa i podswietlenie mapy
    
        function viewCountry(event, name){
            event.preventDefault();
            hideElement(list);
            showSection(sectionSec, '20%');
            connectToCountries(countries);
            countryMap.forEach(country => {
                let attr = country.getAttribute("title");
                if(attr === name.value){
                    country.classList.add("visibleCountry"); 
                   
                }
            
            })
            smallMap.forEach(small =>{
                let attr = small.getAttribute("title");
                if(attr === name.value){
                    small.classList.add("visibleCountry"); 
                   
                }
            })
            // btn.setAttribute("disabled", "true");
         
        }
        
        // zdarzenie na btn search
        btn.addEventListener("click", () => viewCountry(event, title));

        // zdarzenie na enter
        title.addEventListener("keyup", function(e){
            if(e.keyCode === 13){
                viewCountry(event, title);
            }
        })

    
        // dodawanie li do list info i weather
        function addItemToWeatherList(parent, item, text){
            let li = document.createElement("li");
            li.innerText = text + item;
            li.classList.add("elRightList");
            parent.appendChild(li);   
        }
    
        function addItemToList( parent, item, text, mapCountry ){
            let button = document.querySelector(".btnAdd");
            let newLi = document.createElement("li");
            newLi.classList.add("elInfo");
            newLi.innerText = text + item;
            parent.appendChild(newLi);
        
    
            // podlaczenie do api pogody i dodanie elementow do boxWeather
            function showWeather(){
                country.map(el => {
                   if(el.name === item){
                    fetch(`http://api.apixu.com/v1/current.json?key=38d2497fd3b242e78fb182314181601&q=${el.capital}`)
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            const { location, current } = data;
           
                            let header = document.querySelector("#titleWeather");
                            header.innerText = `Weather in ${location.name} `
                            let weatherList = document.querySelector("#weatherList");
                          
                            addItemToWeatherList(weatherList, current.temp_c, "Current temperature: ");
                            addItemToWeatherList(weatherList, current.feelslike_c, "Feelslike temperature:  ");
                            addItemToWeatherList(weatherList, current.humidity, "Humidity:  ");
                            addItemToWeatherList(weatherList, current.pressure_mb, "Pressure:  ");
                            addItemToWeatherList(weatherList, current.wind_kph, "Wind km/h:  ");
                            addItemToWeatherList(weatherList, current.condition.text,"Weather condition:  ");
                            
                        
                        
                            let img = document.createElement("img");
                            img.setAttribute("src", current.condition.icon);
                            img.classList.add("icon");
                            boxWeather.appendChild(img);
    
                            let timeParagraph = document.createElement("p");
                            timeParagraph.innerText = current.last_updated;
                            timeParagraph.classList.add("time");
                            boxWeather.insertBefore(timeParagraph, sun);
                            
                            let newTime = current.last_updated.slice(11, 16);
                            if(newTime[0] >= 2 || newTime[0] === '0' && newTime[1] <= 5){
                                document.querySelector(".second-page__list--moon").style.display = "block";
                                boxWeather.classList.add("night");
                                
                            } else {
                                document.querySelector(".second-page__list--sun").style.display = "block";
                                boxWeather.classList.add("day");
                            }
                       
                        
                        }).catch(error => {
                            console.log('fail', error);
                        })
                    }
                })
            
    
            }
            // po kliknięciu pokazuje sie okno z pogodą
            button.addEventListener('click', () => {
                showWeather();
                boxWeather.style.display = "block";
                boxWeather.style.opacity = "1";
                button.innerText = "Hide weather";
                button.setAttribute("disabled", "true");
                scrollIt(boxWeather)
    
            });
    
        }

        // funkcja scroll to danej sekcji
        function scrollIt(element) {
            window.scrollTo({
                'behavior': 'smooth',
                'top': element.offsetTop
            });
        }
    
    
        //podlaczenie sie do api countries i pobranie danych + dolaczenie do listy
    
        function connectToCountries(countries){
            fetch('https://restcountries.eu/rest/v2/all')
            .then(res => res.json())
            .then(data => {
                dataCountry = data;
                let arr = [];
                data.map(item =>{
                    arr.push(item);
                    const { name, capital, currencies, languages, population } = item;
            
                    location = capital;
                    country = data;
                   
                    const currency = currencies.map(curr =>{
                        return curr.name;
                    })
    
                    const language = languages.map(lang =>{
                        return lang.name;
                    })
    
                    let listOfCountry = document.querySelector("#countryList");
    
                    if(title.value === name){
                        addItemToList(listOfCountry, name, 'Name of the country: ', countries);
                        addItemToList(listOfCountry, capital, 'Capital: ', countries);
                        addItemToList(listOfCountry, currency, 'Currency: ', countries);
                        addItemToList(listOfCountry, language, 'Language: ', countries);
                        addItemToList(listOfCountry, population, 'Population: ', countries);
    
                        let leftBox = document.querySelector("#leftBox");
                        leftBox.style.backgroundImage = `url(${item.flag})`;
                        leftBox.classList.add("leftBoxBackground");
                        
                        return arr; 
                    }  
                    
                })  
                }).catch(error => {
                    console.log('fail', error);
            })
        }
    
    
    
        // btn tips wyswietla tablice z nazwami krajów i chowa
        function createTableTips(){     
            list.classList.add("tips");
            let arrayOfLi = [];
            const tipsArray = countries.map(el => {
                let newLi = document.createElement("li");
                newLi.classList.add("tipsElement");
                list.appendChild(newLi);
                newLi.innerText = el.title;
                header.appendChild(list); 
    
                arrayOfLi.push(newLi);
                return arrayOfLi;
            })
    
            arrayOfLi.forEach(el =>{
                el.addEventListener("click",function(){
                    let text = this.innerText;
                    title.value = text;
                })
            })
    
            return tipsArray;
       
        }

        //po kliknięciu na btn pokazanie tablicy tips i wyłączenie guzika
        tips.addEventListener("click",function(){
            if(list.getAttribute("class") !== "tips"){
                createTableTips()
            } else {
                hideElement(list);
                tips.setAttribute("disabled", "true");
            }
            
        })
            

        //wyjście z drugiej sekcji
    
        exit.addEventListener("click", () => hideElement(sectionSec));
    
    
    
        // przejście do sekcji -  lista i wyjście z sekcji
    
    
        // listBtn.addEventListener("click", function(){
        //     showSection(listSection, '120%');
        //     scrollIt(listSection);
        // });
    
        document.querySelector("#exitList").addEventListener("click", () => hideElement(listSection));
    
    
        // dodanie do listy życzeń
    
         function saveDataToDB(item, user) {
            array.push(item);
        
            database.ref('item').set({
                country: array,
    
            })
            database.ref('user').set({
                user: firebase.auth().currentUser.uid,
    
            })
        }
    
        function swichListItem(parent){
           
            const listEl = document.querySelectorAll(".elInfo");
            let country = listEl[0].innerText;
            addItemToList(parent, country, '' );
            saveDataToDB(country);
           
        }
    
       
        visitBtn.addEventListener("click", function(){
            showSection(listSection, '120%');
            scrollIt(listSection);
            swichListItem(wishList);
            console.log(array);
        });
       
        addVisitedBtn.addEventListener("click", function(){
            showSection(listSection, '120%');
            scrollIt(listSection);
            swichListItem(visitedList);
        })
    
    
    
    })