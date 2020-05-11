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
    }
    clickButton(event){        
        this.view.resetColors();
        this.model.resetMistakeCounter();        
        this.view.hideStartButton();                
        this.view.renderMistakeBlock(model.getCountOfMistakes());
        this.model.setDigits();
        this.view.showDigitsBlock(model.getDigits());        
        this.showNumberIndices = [false,false,false,false,false]  
        this.rightDigits = []; 
        this.rightNumbersCount = 0;        
        setTimeout(this.view.hideDigits.bind(view),5000);
        setTimeout(this.view.setClickBlockFunction.bind(view),5000,this.clickBlockFunction)                                                  
    }    
    clickBlock(event){
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
                this.view.showDigit(index);              
                this.rightDigits.push(rightDigit);
                this.rightNumbersCount++;                
                this.view.playAudio("audio/success_sound.mp3");
            }
            if (this.rightNumbersCount == 5){
                
                this.view.showDigit(index);              
                this.view.playAudio("audio/applause.mp3")
                setTimeout(this.view.hideDigitsBlock.bind(view),1000);
                setTimeout(this.view.renderStartButton.bind(view),1000);                                
                setTimeout(this.view.hideMistakeBlock.bind(view),1000);                       
                this.view.setClickBlockFunction(undefined);                        
            }            
        }         
    }
    init(){
        this.clickFunction = this.clickButton.bind(this);
        this.view.setButtonClickEvent(this.clickFunction);        
        this.clickBlockFunction = this.clickBlock.bind(this);                                     
        this.view.renderStartButton();         
        this.view.hideDigitsBlock();
        this.view.hideMistakeBlock();                     
    }
}
var controller = new Controller(view,model);
controller.init();
