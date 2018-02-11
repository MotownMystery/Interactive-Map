import { MapSetup } from "./MapSetup";

class ToolTips extends MapSetup{
    constructor(){
        super();
        this.arrayOfLi = [];
        this.tipsBtn = document.querySelector("#tipBtn");
        this.tipsText = "";


        this.tipsBtn.addEventListener("click",(e)=>{
            if(this.list.getAttribute("class") !== "tips"){
                this.createTableTips()
            } else {
                this.hideElement(this.list);
                e.target.setAttribute("disabled", "true");
            }
            
        });

    }
    createTableTips(){
        this.list.classList.add("tips");
        [...this.countryMap].map(el => {
            this.attribute = el.getAttribute("title")
            let newLi = document.createElement("li");
            newLi.classList.add("tipsElement");
            this.list.appendChild(newLi);
            newLi.innerText = this.attribute;
            header.appendChild(this.list); 
            this.arrayOfLi.push(newLi);
         
        })
    }
    showCountryFromTableTips(){
        [...this.arrayOfLi].forEach(tip =>{
            tip.addEventListener("click",(e) =>{
                this.tipsText = e.target.innerText;
                this.title.value = this.tipsText;
            })
        });
    }
}

export { ToolTips }