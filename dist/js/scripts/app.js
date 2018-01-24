"use strict";

document.addEventListener("DOMContentLoaded", function () {

    //firebase interactive-map
    var config = {
        apiKey: "AIzaSyAdWKgrquitVPYVZaieV2ZZFJKC95Iel98",
        authDomain: "interactive-map-f5060.firebaseapp.com",
        databaseURL: "https://interactive-map-f5060.firebaseio.com",
        projectId: "interactive-map-f5060",
        storageBucket: "interactive-map-f5060.appspot.com",
        messagingSenderId: "595861650630"
    };
    firebase.initializeApp(config);
    var database = firebase.database();

    //elementy do logowania
    var logIn = document.getElementById("logIn");
    var signIn = document.getElementById("signIn");
    var logOut = document.getElementById("logOut");
    var btnSendSign = document.getElementById("sendSignIn");
    var btnSendLog = document.getElementById("sendLogIn");
    var form = document.getElementById("signInForm");
    var array = [];

    //pokaz formularz do logowania

    // logOut.classList.add("hide");
    logIn.addEventListener("click", function (e) {
        document.getElementById('logInForm').style.display = "block";
    });

    //wylogowanie sie uzytkownika

    logOut.addEventListener("click", function (e) {
        firebase.auth().signOut();
    });
    //pokaz formularz do rejestracji
    signIn.addEventListener("click", function (e) {
        document.getElementById('signInForm').style.display = "block";
    });

    //zalogowanie uzytkownika

    btnSendLog.addEventListener("click", function (e) {
        e.preventDefault();
        var passw = document.getElementById("password").value;
        var email = document.getElementById("email").value;
        var auth = firebase.auth();

        var promise = auth.signInWithEmailAndPassword(email, passw);
        promise.catch(function (e) {
            return console.log(e.message);
        });
    });

    //rejestracja nowego uzytkownika
    btnSendSign.addEventListener("click", function (e) {
        e.preventDefault();
        var passw = document.getElementById("password").value;
        var email = document.getElementById("email").value;
        var auth = firebase.auth();

        var promise = auth.createUserWithEmailAndPassword(email, passw);
        promise.catch(function (e) {
            return console.log(e.message);
        });
    });

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log(user + "logged in" + firebase.auth().currentUser.uid);
            logOut.classList.remove("hide");
        } else {
            console.log('not logged in');
            logOut.classList.add("hide");
        }
    });

    //zmienne
    var img = document.querySelector("#map");
    var countryMap = img.querySelectorAll("path");
    var imgSmall = document.querySelector("#mapSec");
    var smallMap = imgSmall.querySelectorAll("path");
    var title = document.querySelector("#countryName");
    var toolTip = document.querySelector("#toolTip");
    var header = document.querySelector("#header");

    var btn = document.querySelector("#btn");
    var tips = document.querySelector("#tipBtn");
    var listBtn = btn.previousElementSibling;

    var list = header.querySelector("ul");
    var sectionSec = document.querySelector("#aboveSec");
    var apiKeyWet = 'f4779c85f173bc69a529ddd3ab6e9770';
    var apiKeyTime = 'ALQA70H88TB7';
    var exit = document.querySelector("#exitBtn");

    var boxWeather = document.querySelector("#weatherBox");
    var countryInfo = document.querySelector("#countryList");
    var sun = document.querySelector("#sun");
    var moon = document.querySelector("#moon");
    var littleMoon = document.querySelector("#littleMoon");
    var location = null;
    var country = null;
    var dataCountry = null;

    var listSection = document.querySelector(".list__box");
    var visitedList = document.querySelector("#listVisited");
    var wishList = document.querySelector("#listWish");
    var visitBtn = document.querySelector("#addToVisit");
    var addVisitedBtn = visitBtn.previousElementSibling;

    // tablica obiektow kraje id i nazwy
    var countries = [];

    countryMap.forEach(function (country) {
        if (typeof country !== '') {
            countries.push({ id: country.id, title: country.getAttribute("title") });
            return countries;
        }
    });

    //small map - podswietlenie wybranego kraju
    var smallCountries = [];

    smallMap.forEach(function (country) {
        if (typeof country !== '') {
            smallCountries.push({ id: country.id, title: country.getAttribute("title") });
            return smallCountries;
        }
    });

    //pozycja kursora
    window.onmousemove = mousePosition;
    function mousePosition(e) {

        return { x: e.clientX, y: e.clientY };
    }

    //najechanie na mape i podswietlenie
    countryMap.forEach(function (country) {
        country.addEventListener("mouseenter", function () {
            this.classList.add("visibleCountry");
            toolTip.innerText = country.getAttribute("title");
            title.innerText = country.getAttribute("title");

            toolTip.style.display = "block";
            toolTip.style.top = mousePosition(window.event).y + "px";
            toolTip.style.transform = "translate(0,100%)";
            toolTip.style.left = mousePosition(window.event).x + "px";
        });

        country.addEventListener("mouseleave", function () {

            this.classList.remove("visibleCountry");
            toolTip.style.display = "none";
        });
    });

    //widocznosc sekcji

    function showSection(section, positionTop) {
        section.style.display = 'block';
        section.style.opacity = '1';
        section.style.top = positionTop;

        // section.style.transform = 'translate(-50%,-50%)';
    }

    //pobranie inputa i podswietlenie mapy


    function viewCountry(event, name) {
        event.preventDefault();
        hideTableTips(list);
        showSection(sectionSec, '0');
        connectToCountries(countries);
        countryMap.forEach(function (country) {
            var attr = country.getAttribute("title");
            if (attr === name.value) {
                country.classList.add("visibleCountry");
            }
        });
        smallMap.forEach(function (small) {
            var attr = small.getAttribute("title");
            if (attr === name.value) {
                small.classList.add("visibleCountry");
            }
        });
        // btn.setAttribute("disabled", "true");
    }

    btn.addEventListener("click", function () {
        return viewCountry(event, title);
    });

    // dodawanie li do list info i weather
    function addItemToWeatherList(parent, item, text) {
        var li = document.createElement("li");
        li.innerText = text + item;
        li.classList.add("elRightList");
        parent.appendChild(li);
    }

    function addItemToList(parent, item, text, mapCountry) {
        var button = document.querySelector(".btnAdd");
        var newLi = document.createElement("li");
        newLi.classList.add("elInfo");
        newLi.innerText = text + item;
        parent.appendChild(newLi);

        // podlaczenie do api pogody i dodanie elementow do boxWeather
        function showWeather() {
            country.map(function (el) {
                if (el.name === item) {
                    fetch("http://api.apixu.com/v1/current.json?key=38d2497fd3b242e78fb182314181601&q=" + el.capital).then(function (res) {
                        return res.json();
                    }).then(function (data) {
                        var location = data.location,
                            current = data.current;


                        var header = document.querySelector("#titleWeather");
                        header.innerText = "Weather in " + location.name + " ";
                        var weatherList = document.querySelector("#weatherList");

                        addItemToWeatherList(weatherList, current.temp_c, "Current temperature: ");
                        addItemToWeatherList(weatherList, current.feelslike_c, "Feelslike temperature:  ");
                        addItemToWeatherList(weatherList, current.humidity, "Humidity:  ");
                        addItemToWeatherList(weatherList, current.pressure_mb, "Pressure:  ");
                        addItemToWeatherList(weatherList, current.wind_kph, "Wind km/h:  ");
                        addItemToWeatherList(weatherList, current.condition.text, "Weather condition:  ");

                        var img = document.createElement("img");
                        img.setAttribute("src", current.condition.icon);
                        img.classList.add("icon");
                        boxWeather.appendChild(img);

                        var timeParagraph = document.createElement("p");
                        timeParagraph.innerText = current.last_updated;
                        timeParagraph.classList.add("time");
                        boxWeather.insertBefore(timeParagraph, sun);

                        var newTime = current.last_updated.slice(11, 16);
                        if (newTime[0] >= 2 || newTime[0] === '0' && newTime[1] <= 5) {
                            document.querySelector(".second-page__list--moon").style.display = "block";
                            boxWeather.classList.add("night");
                        } else {
                            document.querySelector(".second-page__list--sun").style.display = "block";
                            boxWeather.classList.add("day");
                        }
                    }).catch(function (error) {
                        console.log('fail', error);
                    });
                }
            });
        }
        // po kliknięciu pokazuje sie okno z pogodą
        button.addEventListener('click', function () {
            showWeather();
            boxWeather.style.opacity = "1";
            button.innerText = "Hide weather";
            button.setAttribute("disabled", "true");
            scrollIt(boxWeather);
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

    function connectToCountries(countries) {
        fetch('https://restcountries.eu/rest/v2/all').then(function (res) {
            return res.json();
        }).then(function (data) {
            dataCountry = data;
            var arr = [];
            data.map(function (item) {
                arr.push(item);
                var name = item.name,
                    capital = item.capital,
                    currencies = item.currencies,
                    languages = item.languages,
                    population = item.population;


                location = capital;
                country = data;

                var currency = currencies.map(function (curr) {
                    return curr.name;
                });

                var language = languages.map(function (lang) {
                    return lang.name;
                });

                var listOfCountry = document.querySelector("#countryList");

                if (title.value === name) {
                    addItemToList(listOfCountry, name, 'Name of the country: ', countries);
                    addItemToList(listOfCountry, capital, 'Capital: ', countries);
                    addItemToList(listOfCountry, currency, 'Currency: ', countries);
                    addItemToList(listOfCountry, language, 'Language: ', countries);
                    addItemToList(listOfCountry, population, 'Population: ', countries);

                    var leftBox = document.querySelector("#leftBox");
                    leftBox.style.backgroundImage = "url(" + item.flag + ")";
                    leftBox.classList.add("leftBoxBackground");
                    // let box = document.querySelector(".second-page__list");
                    // let img = document.createElement("img");
                    // img.setAttribute("src", item.flag);
                    // img.classList.add("flags");
                    // box.appendChild(img);
                }
                return arr;
            });
        }).catch(function (error) {
            console.log('fail', error);
        });
    }

    // btn tips wyswietla tablice z nazwami krajów i chowa

    function createTableTips() {
        list.classList.add("tips");
        var arrayOfLi = [];
        var tipsArray = countries.map(function (el) {
            var newLi = document.createElement("li");
            newLi.classList.add("tipsElement");
            list.appendChild(newLi);
            newLi.innerText = el.title;
            header.appendChild(list);

            arrayOfLi.push(newLi);
            return arrayOfLi;
        });

        arrayOfLi.forEach(function (el) {
            el.addEventListener("click", function () {

                var text = this.innerText;
                title.value = text;
            });
        });

        return tipsArray;
    }

    tips.addEventListener("click", function () {
        if (list.getAttribute("class") !== "tips") {
            createTableTips();
        } else {
            hideTableTips();
            tips.setAttribute("disabled", "true");
        }
    });

    function hideTableTips() {

        list.style.display = "none";
    }

    //wyjście z drugiej sekcji

    exit.addEventListener("click", function () {

        sectionSec.style.display = "none";
    });

    // przejście do sekcji -  lista i wyjście z sekcji


    // listBtn.addEventListener("click", function(){
    //     showSection(listSection, '120%');
    //     scrollIt(listSection);
    // });

    document.querySelector("#exitList").addEventListener("click", function () {
        listSection.style.display = "none";
    });

    // dodanie do listy życzeń

    function saveDataToDB(item, user) {
        array.push(item);

        database.ref('item').set({
            country: array

        });
        database.ref('user').set({
            user: firebase.auth().currentUser.uid

        });
    }

    function swichListItem(parent) {

        var listEl = document.querySelectorAll(".elInfo");
        var country = listEl[0].innerText;
        addItemToList(parent, country, '');
        saveDataToDB(country);
    }

    visitBtn.addEventListener("click", function () {
        showSection(listSection, '120%');
        scrollIt(listSection);
        swichListItem(wishList);
        console.log(array);
    });

    addVisitedBtn.addEventListener("click", function () {
        showSection(listSection, '120%');
        scrollIt(listSection);
        swichListItem(visitedList);
    });
});