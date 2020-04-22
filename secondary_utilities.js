function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  function generateRandomArray(count){
    let arr = [];
    let randomArray = [];
    let indices = [];
    for (let i = 0; i < 100; i++) {
      arr.push(i);      
    }
    for(let i = 0; i < count; i++){
      let randomIndex = getRandomInt(0,99);
      if (indices.indexOf(randomIndex) == -1){
        randomArray.push(arr[randomIndex]);
        indices.push(randomIndex);        
      }
      else{
        i--;
      }
      
    }
    return randomArray;
    
  }