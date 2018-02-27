 
import { MapSetup } from './MapSetup.js';
import { Map } from './Map.js';
import { ToolTips } from './ToolTips';
import { Lists } from './List'
import {FireBase} from './FireBase'


 document.addEventListener("DOMContentLoaded", function(){

    const map = new MapSetup() ;
    map.createArrayBigMap();
    map.createArraySmallMap()
    map.selectCountries();
    map.getCapital();


    const bigMap = new Map();
    bigMap.blinkMap();
    bigMap.selectCountries()
    bigMap.selectWeather();



    const toolTip = new ToolTips();
    

    const myList = new Lists();
    myList.changeList();
    myList.deleteItem();
    const fireBase = new FireBase();
    fireBase.newUserSign();


 
})