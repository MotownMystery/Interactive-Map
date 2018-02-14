import { MapSetup } from "./MapSetup";

class ToolTips extends MapSetup{
    constructor(){
        super();
        this.tipsText = "";
        this.arrayOfLi = [];
        this.tipsBtn = document.querySelector("#tipBtn");
        // po kliknięciu na btn serach pokazanie listy z nazwami krajów
        this.tipsBtn.addEventListener("click", e =>{
            this.list.classList.add("visible");
            if(this.list.style.display === "block"){
                this.createTableTips();
                this.list.classList.add("hide");
            } else {
                this.hideElement(this.list);
                // e.target.setAttribute("disabled", "true");
            } 
        });
    }
    // stworzenie tablicy z nazwami krajów
    createTableTips(){
        this.list.classList.remove("tips");
        [...this.countryMap].map(el => {
            this.attribute = el.getAttribute("title")
            let newLi = document.createElement("li");
            newLi.classList.add("tipsElement");
            this.list.appendChild(newLi);
            newLi.innerText = this.attribute;
            header.appendChild(this.list); 

            this.arrayOfLi.push(newLi);
            this.showCountryFromTableTips(this.arrayOfLi)

        });
    }
    // pokazanie kraju wybranego z tablicy Tips
    showCountryFromTableTips(arrayOfLi){
        [...arrayOfLi].forEach(tip =>{
            tip.addEventListener("click",(e) =>{
                this.tipsText = e.target.innerText;
                this.title.value = this.tipsText;
            })
        });
    }
}

export { ToolTips }