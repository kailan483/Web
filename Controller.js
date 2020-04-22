class Controller
{    
    constructor(view,model){
        this.selectedBlockNumber = -1;
        this.view = view;
        this.model = model;
        this.clickFunction = null;
        this.clickBlockFunction = null;
        this.rightNumbersCount = 0;  
        this.rightDigits = [];              
    }
    clickButton(event){        
        this.rightDigits.length = 0;
        this.rightNumbersCount = 0;
        this.model.resetMistakeCounter();
        this.model.setDigits();
        this.model.shuffle();
        this.view.resetColors();
        this.view.hideStartButton();
        this.view.showDigitsBlock();
        this.view.render();                
        this.view.showDigits();
        this.view.showMistakeBlock();
        setTimeout(this.view.hideDigits.bind(view),5000);        
        setTimeout(this.view.setClickBlockFunction.bind(view),5000,this.clickBlockFunction)                    
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
                setTimeout(this.view.hideDigitsBlock.bind(view),1000);
                setTimeout(this.view.showStartButton.bind(view),1000);                                
                setTimeout(this.view.hideMistakeBlock.bind(view),1000);                                
            }            
        }         
    }
    init(){
        this.clickFunction = this.clickButton.bind(this);
        view.setButtonClickEvent(this.clickFunction);
        this.clickBlockFunction = this.clickBlock.bind(this);
        view.setClickBlockFunction(this.clickBlockFunction);
    }
}
var controller = new Controller(view,model);
controller.init();
