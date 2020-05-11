class View
{ 
    constructor(){                                 
               
        this.blocksSvg = document.getElementById("blocks");
        this.startButton = document.getElementById("startGameButtonSvg");
        this.mistakeCounterLabel = document.getElementById("mistakeCounterLabel");
        this.mistakesBlock = document.getElementById("mistakesCount");
        this.numberTextBlocks = document.getElementsByClassName("numberBlock")    
        this.svgRects = document.getElementsByClassName("svgRect");    
    }

    resetColors(){
        for (let index = 0; index < this.svgRects.length; index++) {
            const element = this.svgRects[index];
            element.style.fill = "black";   
        }        
    }
    renderMistakes(mistakeCount){        
        this.mistakeCounterLabel.style.display = "block";
        this.mistakesBlock.style.display = "block";
        let countBlock = document.getElementById("count");                
        countBlock.innerHTML = mistakeCount;
        
    }

    renderDigits(digits) {
        for (let index = 0; index < this.numberTextBlocks.length; index++) {
            const element = this.numberTextBlocks[index];
            element.innerHTML = digits[index];
        }
    }

    renderStartButton(){
        this.startButton.style.display = "block";
    }     
    setButtonClickEvent(clickFunction){
        this.startButton.onclick = clickFunction;
    }    
    
    hideDigits(){        
        for (let index = 0; index < this.numberTextBlocks.length; index++) {
            const element = this.numberTextBlocks[index];
            element.style.display = "none";                               
        }        
    }

    showDigits(digits,showNumberIndices){
       for (let index = 0; index < this.numberTextBlocks.length; index++) {
           const element = this.numberTextBlocks[index];
           element.innerHTML = digits[i];                                 
       }
    }
    showDigit(digitIndex){
        for (let index = 0; index < this.numberTextBlocks.length; index++) {
            const element = this.numberTextBlocks[index];
            if (digitIndex == index)
            {
                this.svgRects[index].style.fill = "green"
                element.style.display = "block";                                                 
            }
            
        }
    }
    hideStartButton(){
        this.startButton.style.display = "none";
    }    

    hideDigitsBlock(){
        this.blocksSvg.style.display = "none";        
    }
    showDigitsBlock(digits){
        this.blocksSvg.style.display = "block"; 
        this.renderDigits(digits);
    }
    updateMistakeBlock(count){        
        this.renderMistakeBlock(count);
    }

    hideMistakeBlock(){
        this.mistakeCounterLabel.style.display = "none";
        this.mistakesBlock.style.display = "none";        
    }

    renderMistakeBlock(mistakesCount){
        this.renderMistakes(mistakesCount);
    }

    playAudio(path){
        var audio = new Audio(path);
        audio.play();
    }
    setClickBlockFunction(clickBlockFunction){        
        for (let index = 0; index < this.svgRects.length; index++) {
            const element = this.svgRects[index];
            element.onclick = clickBlockFunction;
        }
    }
    clickCollision(event){
        for (let index = 0; index < this.svgRects.length; index++) {
            const element = this.svgRects[index];
            if (element == event.currentTarget){
                return index;
            }
        }
    }
}

var view = new View();
