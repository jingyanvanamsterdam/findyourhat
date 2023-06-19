const prompt = require('prompt-sync')({sigint: true});


let gameover = false; 

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(twoDArr){
      this._arr = twoDArr;
    }

    /*need to print each time so it will change lines. And forEach is a good option because it doesn't need to restore the outcomes.*/ 
    get fieldArr(){
      return this._arr;
    }

    print(){
      this._arr.forEach(ele => console.log(ele.join('')));
    }
  
    update(x,y){
      this._arr[x][y]=pathCharacter;
      this._arr.forEach(ele => console.log(ele.join('')));
    }
  
    static generateField(height, width, persent){
      let outsideArr = []; 
      let selection = [hat, hole, fieldCharacter];
      for(let j=0; j<height; j++){
          let insideArr =[];
          let holeCount =0;
          for(let i=0; i< width; i++){
              let newValue = selection[Math.floor(Math.random()*selection.length)];
              if(newValue === hat){
                  insideArr.push(newValue)
                  selection.shift();
              } else if(newValue === hole){
                  holeCount+=1;
                  insideArr.push(newValue);
              } else {
                  insideArr.push(newValue); 
              }   
          }
          if ((holeCount/(height*width))*100 > persent){
              let holeIndex = selection.indexOf(hole)
              selection.splice(holeIndex,1);
          }
          outsideArr.push(insideArr); 
      }
      //set up the random startpoint
      let ramHS = Math.floor(Math.random()*height+1);
      let ramWS = Math.floor(Math.random()*width);
      outsideArr[ramHS][ramWS] = pathCharacter

      //to make sure there is at least one hat in the field. 
      let searchHat = outsideArr.reduce(function(prep, next){return prep.concat(next)})
      if(searchHat.includes(hat)===false){
        let ramH = Math.floor(Math.random()*height+1);
        let ramW = Math.floor(Math.random()*width);
        //Sloved typeError here: cannot set properties of undefined. Forgot to put return....
        return outsideArr[ramH][ramW] = hat;
      }

      return outsideArr
    }
  
  }

//Start the game 
const newField = Field.generateField(4,5,3);
const newInst = new Field(newField);
newInst.print();
let x=indexOf(pathCharacter); 
let y=0;

while(!gameover && x<newInst.fieldArr.length && y<newInst.fieldArr[0].length){
    let move = prompt('Make a move! up is u, down is d, left is l, right is e.');

    switch(move){
        case 'u':
            x-=1;
            break; 
        case 'd':
            x+=1;
            break;
        case 'l':
            y-=1; 
            break; 
        case 'e':
            y+=1;
            break;
        default:
            console.log('Please enter u, d, l or e.')
    } 

 //!!gameover conditions: if x is bigger than the height, then the newInst.fieldArr[x][y] will throw an error. so use try..catch to avoid the error. 
    try{
        if(x<0 || y<0){
            console.log('Sorry, you move out of the field. Game over.');
            gameover = true;
        } else if (newInst.fieldArr[x][y]===hole){
            //need to change newField.fieldArr
            console.log('Sorry, you steped into a hole. Game over!'); 
            gameover = true; 
        } else if (newInst.fieldArr[x][y]===hat){
            console.log('Congrats! You find your hat!');
            gameover = true; 
        } else if (y>=newInst.fieldArr[0].length){
            console.log(newInst.fieldArr[0].length, 'Sorry, you move out of the field. Game over');
            gameover = true;
        } else {
            newInst.update(x,y)
            console.log('What is your move next?')
        }
    } catch(e){
        console.log('Sorry, you move out of the field. Game over');
        gameover = true;
    }
    
    
}

//console.log(move);





/*const testStatic = Field.generateField(3,4,15)
const test = new Field(testStatic)
test.print()*/


/*Have the character start on a random location that’s not the upper-left corner.
Create a “hard mode” where one or more holes are added after certain turns.
Improve your game’s graphics and interactivity in the terminal. There are many helpful packages to assist with this, and you can really get creative with how you approach terminal games.
Create a field validator to ensure that the field generated by Field.generateField() can actually be solved. This might be pretty difficult! You’ll essentially be creating a version of a maze solver.*/