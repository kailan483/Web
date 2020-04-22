class View
{ 
    constructor(){
        this.blocksDiv = document.getElementById("blocks");   
        this.blocksDiv.style.display = "none";            
        this.button = document.getElementById("button");        
        this.render();
    }
    render(){
        var digits = model.getDigits();
        this.blocksDiv.innerHTML = "";
        for (let i = 0; i < digits.length; i++) {
            var block = document.createElement("div");
            block.className="block";
            var paragraph = document.createElement("p");
            paragraph.style.display = "none";
            paragraph.innerText = digits[i];                
            block.appendChild(paragraph);
            this.blocksDiv.appendChild(block);          
        }
        this.updateMistakeBlock(0);
        this.hideMistakeBlock();
    }        
    setButtonClickEvent(clickFunction){
        this.button.onclick = clickFunction;                
    }
    alertNumber(number){
        alert(number);
    }
    getNumberOfClickedBlock(event){
        var blocks = document.getElementsByClassName("block");
        for (let index = 0; index < blocks.length; index++) {
            const element = blocks[index];
            if (element == event.currentTarget){
                return index;
            }
        }
    }
    setClickBlockFunction(clickBlockFunction){
        var blocks = document.getElementsByClassName("block");
        for (let index = 0; index < blocks.length; index++) {
            const element = blocks[index];
            element.onclick = clickBlockFunction;
        }
    }
    showDigits(){
        var blocks = document.getElementsByClassName("block");
        for (let i = 0; i < blocks.length; i++) {
            const child = blocks[i].firstChild;            
            child.style.display = "block";
        }
    }
    hideDigits(){
        var blocks = document.getElementsByClassName("block");
        for (let i = 0; i < blocks.length; i++) {
            const child = blocks[i].firstChild;            
            child.style.display = "none";
        }
    }
    showDigit(blockIndex){
        var blocks = document.getElementsByClassName("block");
        for (let i = 0; i < blocks.length; i++) {            
            if (i == blockIndex){
                blocks[i].style.backgroundColor = "green";
                const child = blocks[i].firstChild;
                child.style.display = "block";
            }
        }
    }
    resetColors(){
        var blocks = document.getElementsByClassName("block");
        for (let i = 0; i < blocks.length; i++) {                        
                blocks[i].style.backgroundColor = "dimgray";                            
        }
    }
    hideStartButton(){
        this.button.style.display = "none";
    }
    showStartButton(){
        this.button.style.display = "block";
    }
    hideDigitsBlock(){
        this.blocksDiv.style.display = "none";        
    }
    showDigitsBlock(){
        this.blocksDiv.style.display = "block";
    }
    updateMistakeBlock(count){
        var mistakeCounter = document.getElementById("mistakeCounter");
        var p = mistakeCounter.firstElementChild;
        p.innerText = count;
    }
    hideMistakeBlock(){
        var mistakeCounter = document.getElementById("mistakeCounter");
        var mistakeCounterLabel = document.getElementById("mistakeCounterLabel");        
        mistakeCounter.style.display = "none";
        mistakeCounterLabel.style.display = "none";
    }
    showMistakeBlock(){
        var mistakeCounter = document.getElementById("mistakeCounter");
        var mistakeCounterLabel = document.getElementById("mistakeCounterLabel");    
        mistakeCounter.style.display = "block";
        mistakeCounterLabel.style.display = "block";
    }
    playAudio(path){
        var audio = new Audio(path);
        audio.play();
    }
}
var view = new View();
