class View
{ 
    constructor(){
        // this.blocksDiv = document.getElementById("blocks");   
        // if (this.blocksDiv != null)
        // this.blocksDiv.style.display = "none";                    
        this.canvas = document.getElementById("canvas");   
        this.canvas.width = 604;
        this.canvas.height = 124;         
        this.context = this.canvas.getContext("2d");        
        this.context.font = "36pt Verdana";
        this.canvas.style.display = "block";
        this.canvasLeft = this.canvas.offsetLeft;
        this.canvasTop = this.canvas.offsetTop;        

        this.buttonCanvas = document.getElementById("startGameButtonCanvas");
        this.buttonCanvas.width = 604;
        this.buttonCanvas.height = 124;
        this.buttonCanvasContext = this.buttonCanvas.getContext("2d");
        this.buttonCanvasContext.font = "36pt Verdana";        

        this.mistakesCanvas = document.getElementById("mistakesCount");
        this.mistakesContext = this.mistakesCanvas.getContext("2d");
        this.mistakesCanvas.width = 604;
        this.mistakesCanvas.height = 200;
        this.mistakesContext.font = "24pt Verdana"                  

        window.onresize = this.updateCanvasPos.bind(this);

        this.blocks = [];
                        
        for (let i = 0; i < 5; i++){
            this.blocks.push({
                x: i * 120 + 2,
                y: 2,
                width: 120,
                height: 120,                 
            });
        }

    }

    renderMistakes(mistakeCount){
        this.mistakesContext.fillStyle = "white";
        var text = this.mistakesContext.measureText("Количество ошибок");        
        this.mistakesContext.fillText("Количество ошибок",this.mistakesCanvas.width / 2 - text.width / 2,80);
        this.mistakesContext.fillStyle = "yellowgreen";
        this.mistakesContext.fillRect(this.mistakesCanvas.width / 2 - 60,110,120,90);
        var mistakeCountText = this.mistakesContext.measureText(mistakeCount);
        this.mistakesContext.fillStyle = "white";
        this.mistakesContext.fillText(mistakeCount,this.mistakesCanvas.width / 2 - mistakeCountText.width / 2,165)

    }

    renderBlocks(digits){
        this.context.fillStyle = "brown";
        this.context.lineWidth = 2;
        
        for (let index = 0; index < this.blocks.length; index++) {
            const element = this.blocks[index];
            this.context.fillRect(
                element.x,
                element.y,
                element.width,
                element.height
            )
            this.context.strokeRect(
                element.x,
                element.y,
                element.width,
                element.height
            )                    
        }
        this.context.fillStyle = "white"; 
        if (digits != null)
        for(let i = 0; i < 5; i++) {
            var text =this.context.measureText(digits[i]);
            this.context.fillText(digits[i],i * 120 + 60 - text.width / 2,80);
        }   
    }

    renderStartButton(){
        this.buttonCanvasContext.fillStyle = "yellowgreen";
        this.buttonCanvasContext.fillRect(0,0,604,124);
        this.buttonCanvasContext.fillStyle = "white";    
        var text = this.buttonCanvasContext.measureText("Начать игру");
        this.buttonCanvasContext.fillText("Начать игру",604 / 2 - text.width / 2,80);
    }

    render(digits){            
        // this.renderMistakes(0);
        // this.renderBlocks(digits);
        this.renderStartButton();
    }    

    updateCanvasPos(){
        var canvas = document.getElementById("canvas");
        this.canvasLeft = canvas.offsetLeft;
        this.canvasTop = canvas.offsetTop;        
    }

    setButtonClickEvent(clickFunction){
        if (this.buttonCanvas != null)
        this.buttonCanvas.onclick = clickFunction;               
    }    
    
    hideDigits(){
        this.hideDigitsBlock();
        this.renderBlocks(null);        
    }

    showDigits(digits,showNumberIndices){
        this.hideDigitsBlock();
        this.context.fillStyle = "brown";
        this.context.lineWidth = 2;
        var flag = false;
        for (let index = 0; index < this.blocks.length; index++) {
            if (showNumberIndices[index] == true){
                this.context.fillStyle = "green";
            }
            else{
                this.context.fillStyle = "brown";
            }
            const element = this.blocks[index];
            this.context.fillRect(
                element.x,
                element.y,
                element.width,
                element.height
            )
            this.context.strokeRect(
                element.x,
                element.y,
                element.width,
                element.height
            )                    
        }
        this.context.fillStyle = "white"; 
        if (digits != null)
        for(let i = 0; i < 5; i++) {
            if (showNumberIndices[i] == true){
                var text =this.context.measureText(digits[i]);
                this.context.fillText(digits[i],i * 120 + 60 - text.width / 2,80);    
            }            
        }   
    }

    resetColors(){
        var blocks = document.getElementsByClassName("block");
        if (blocks != null)
        for (let i = 0; i < blocks.length; i++) {                        
                blocks[i].style.backgroundColor = "dimgray";                            
        }
    }

    hideStartButton(){
        this.buttonCanvasContext.clearRect(0,0,this.buttonCanvas.width,this.buttonCanvas.height);
    }    

    hideDigitsBlock(){
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    }

    showDigitsBlock(){
        if (this.button != null)
        this.blocksDiv.style.display = "block";
    }

    updateMistakeBlock(count){
        this.hideMistakeBlock();
        this.renderMistakeBlock(count);
    }

    hideMistakeBlock(){
        this.mistakesContext.clearRect(0,0,this.mistakesCanvas.width,this.mistakesCanvas.height);
    }

    renderMistakeBlock(mistakesCount){
        this.renderMistakes(mistakesCount);
    }

    playAudio(path){
        var audio = new Audio(path);
        audio.play();
    }

    setClickCanvasFunction(clickCanvasFunction){
        if (canvas != null)
        this.canvas.onclick = clickCanvasFunction;
    }

    clickCollision(event){
        var x = event.offsetX;
        var y = event.offsetY;

        for (let i = 0; i < this.blocks.length; i++) {
            const element = this.blocks[i];
            if (y > element.y && y < element.y + element.height 
                && x > element.x && x < element.x + element.width) {
                return i;
            }
        }        
    }
}

var view = new View();
