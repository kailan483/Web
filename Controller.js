class Controller
{    
    constructor(view,model){
        this.selectedBlockNumber = -1;
        this.view = view;
        this.model = model;
        this.clickFunction = null;
        this.clickBlockFunction = null;
        this.clickCanvasFunction = null;
        this.rightNumbersCount = 0;  
        this.rightDigits = [];  
        this.showNumberIndices = [false,false,false,false,false]            
    }
    clickButton(event){        
        this.model.resetMistakeCounter();
        
        this.view.hideStartButton();        
        this.view.renderMistakeBlock(model.getCountOfMistakes());
        this.model.setDigits();
        this.view.renderBlocks(model.getDigits());
        this.showNumberIndices = [false,false,false,false,false]  
        this.rightDigits = []; 
        this.rightNumbersCount = 0;
        this.view.setClickCanvasFunction(undefined); 
        setTimeout(this.view.hideDigits.bind(view),5000);               
        setTimeout(this.view.setClickCanvasFunction.bind(view),5000,this.clickCanvasFunction);               
        this.view.setButtonClickEvent(undefined);
    }
    clickBlock(event){
        var number = view.getNumberOfClickedBlock(event); 
        var clickedDigit = this.model.getDigit(number);
        var rightDigit = this.model.getDigitFromSorted(this.rightNumbersCount)

        if (this.rightNumbersCount <= 4)
        {
            if (rightDigit != clickedDigit && this.rightDigits.indexOf(clickedDigit) == -1){
                this.model.incrementMistakeCounter();
                var count = model.getCountOfMistakes();
                this.view.updateMistakeBlock(count);
                this.view.playAudio("audio/error.wav");               
            }
            else if (this.rightDigits.indexOf(clickedDigit) == -1){                
                this.view.showDigit(number);
                this.rightDigits.push(rightDigit);
                this.rightNumbersCount++;
                this.view.playAudio("audio/success_sound.mp3");
            }
            if (this.rightNumbersCount == 5){

                this.view.showDigit(number);
                this.view.playAudio("audio/applause.mp3")
                this.view.setButtonClickEvent(this.clickFunction);        
                setTimeout(this.view.hideDigitsBlock.bind(view),1000);
                setTimeout(this.view.showStartButton.bind(view),1000);                                
                setTimeout(this.view.hideMistakeBlock.bind(view),1000);                                
            }            
        }         
    }
    clickCanvas(event){
        var index = this.view.clickCollision(event);        
        var clickedDigit = this.model.getDigit(index);
        var rightDigit = this.model.getDigitFromSorted(this.rightNumbersCount)
        if (this.rightNumbersCount <= 4)
        {
            if (rightDigit != clickedDigit && this.rightDigits.indexOf(clickedDigit) == -1){
                this.model.incrementMistakeCounter();
                var count = model.getCountOfMistakes();
                this.view.updateMistakeBlock(count);
                this.view.playAudio("audio/error.wav");               
            }
            else if (this.rightDigits.indexOf(clickedDigit) == -1){                
                this.showNumberIndices[index] = true;
                this.view.showDigits(this.model.getDigits(),this.showNumberIndices);                
                this.rightDigits.push(rightDigit);
                this.rightNumbersCount++;                
                this.view.playAudio("audio/success_sound.mp3");
            }
            if (this.rightNumbersCount == 5){

                this.showNumberIndices[index] = true;
                this.view.showDigits(this.model.getDigits(),this.showNumberIndices);
                this.view.playAudio("audio/applause.mp3")
                setTimeout(this.view.hideDigitsBlock.bind(view),1000);
                setTimeout(this.view.renderStartButton.bind(view),1000);                                
                setTimeout(this.view.hideMistakeBlock.bind(view),1000);       
                this.view.setButtonClickEvent(this.clickFunction);                             
            }            
        }         
    }
    init(){
        this.clickFunction = this.clickButton.bind(this);
        this.view.setButtonClickEvent(this.clickFunction);        
        this.clickCanvasFunction = this.clickCanvas.bind(this);
        this.view.setClickCanvasFunction(this.clickCanvasFunction);              
        this.view.renderStartButton();         
    }
}
var controller = new Controller(view,model);
controller.init();
