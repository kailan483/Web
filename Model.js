class Model
{
    constructor(){
     this.digits = [];  
     this.sortedDigits = [];
     this.mistakeCounter = 0;
    }
    setDigits(){
        this.digits = generateRandomArray(5);
        this.sortedDigits = this.digits.slice().sort(function(a,b){
            return a-b;
        })
    }
    getDigits(){
        return this.digits;
    }    
    getDigit(number){
        return this.digits[number];
    }
    getDigitFromSorted(number){
        return this.sortedDigits[number];
    }
    shuffle(){
        for (let i = this.digits.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));        
            [this.digits[i], this.digits[j]] = [this.digits[j], this.digits[i]];
          }        
    }
    incrementMistakeCounter(){
        this.mistakeCounter++;
    }
    decrementMistakeCounter(){
        this.mistakeCounter--;
    }
    resetMistakeCounter(){
        this.mistakeCounter = 0;
    }
    getCountOfMistakes(){
        return this.mistakeCounter;
    }
}
var model = new Model();
model.setDigits();