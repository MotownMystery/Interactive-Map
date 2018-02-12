 
import { MapSetup } from './MapSetup.js';
import { Map } from './Map.js';
import { ToolTips } from './ToolTips';
import { WeatherMap } from './WeatherMap';
import { Lists } from './List'
import {FireBase} from './FireBase'


 document.addEventListener("DOMContentLoaded", function(){

    const map = new MapSetup() ;
    map.createArrayBigMap();
    map.createArraySmallMap()
    map.selectCountries();
 

    const bigMap = new Map();
    bigMap.blinkMap();
    bigMap.selectCountries()
    console.log(bigMap);


    const toolTip = new ToolTips();
    // toolTip.showCountryFromTableTips()
    console.log(toolTip)


    const weatherMap = new WeatherMap();
    weatherMap.showWeather();
 

    const myList = new Lists();
  

    const fireBase = new FireBase();
    fireBase.newUserSign();


 
})