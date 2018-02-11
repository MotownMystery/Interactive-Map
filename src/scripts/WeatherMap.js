import { MapSetup } from "./MapSetup";

class WeatherMap extends MapSetup{
    constructor(){
        super();
        this.weatherList = document.querySelector("#weatherList");
        this.headerWeather = document.querySelector("#titleWeather");
        this.boxWeather = document.querySelector("#weatherBox");
        this.button.addEventListener('click', (e) => {
                if(this.button.innerText === "Show weather"){
                    this.showWeather();
                    this.boxWeather.style.display = "block";
                    this.boxWeather.style.opacity = "1";
                    this.scrollIt(this.boxWeather);
                    e.target.innerText = "Hide weather";
                } else {
                    this.boxWeather.style.display = "none";
                    e.target.innerText = "Show weather";
                }
            
            });

    }
    addItemToWeatherList(parent, item, text){
        let li = document.createElement("li");
        li.innerText = text + item;
        li.classList.add("elRightList");
        parent.appendChild(li);   
    }

    showWeather(){
        super.selectCountries();
        [...this.countriesBox].map(country => {
            if(country.name === this.title.value){
                fetch(`https://api.apixu.com/v1/current.json?key=38d2497fd3b242e78fb182314181601&q=${country.capital}`)
                .then(res => res.json())
                .then(data => {
                    const { location, current } = data;
           
                    
                    this.headerWeather.innerText = `Weather in ${location.name} `    
                    this.addItemToWeatherList(this.weatherList, current.temp_c, "Current temperature: ");
                    this.addItemToWeatherList(this.weatherList, current.feelslike_c, "Feelslike temperature:  ");
                    this.addItemToWeatherList(this.weatherList, current.humidity, "Humidity:  ");
                    this.addItemToWeatherList(this.weatherList, current.pressure_mb, "Pressure:  ");
                    this.addItemToWeatherList(this.weatherList, current.wind_kph, "Wind km/h:  ");
                    this.addItemToWeatherList(this.weatherList, current.condition.text,"Weather condition:  ");
                            
                        
                        
                    let img = document.createElement("img");
                    img.setAttribute("src", current.condition.icon);
                    img.classList.add("icon");
                    this.boxWeather.appendChild(img);
    
                    let timeParagraph = document.createElement("p");
                    timeParagraph.innerText = current.last_updated;
                    timeParagraph.classList.add("time");
                    this.boxWeather.insertBefore(timeParagraph, sun);
                            
                    let newTime = current.last_updated.slice(11, 16);
                    if(newTime[0] >= 2 || newTime[0] === '0' && newTime[1] <= 5){
                        document.querySelector(".second-page__list--moon").style.display = "block";
                        this.boxWeather.classList.add("night");
                                
                    } else {
                        document.querySelector(".second-page__list--sun").style.display = "block";
                        this.boxWeather.classList.add("day");
                    }
                    
                }).catch(error => {
                    console.log('fail', error);
                })
            }
        })
            
    
    }
}

export { WeatherMap };