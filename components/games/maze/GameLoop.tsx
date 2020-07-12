import { Constants } from './Constants'


const distance = (x1:any,y1:any,x2:any,y2:any) => {
    return Math.sqrt((x2 - x1)*(x2 - x1) + (y2 - y1)*(y2 - y1));
}

const GameLoop = (entities:any, touches:any ) => {

    let wall = entities.wall;
    let hero = entities.hero;
    let finish = entities.finish;
    let state = entities.state;

    if (!state.win){
        if (!wall.filled){
                
            for (let i = 0; i < 10; i++){
                wall.elements = [{x : 5, y : 7*i + 13}].concat(wall.elements);
            }
    
            for (let i = 0; i < 10; i++){
                wall.elements = [{x : 45, y : 7*i + 13}].concat(wall.elements);
            }
    
            for (let i = 0; i < 5; i++){
                wall.elements = [{x : 8*(i) + 9 , y : 5}].concat(wall.elements);
            }
            for (let i = 0; i < 4; i++){
                wall.elements = [{x : 8*(i) + 9, y : 83}].concat(wall.elements);
            }
    
            for (let i = 0; i < 7; i++){
                wall.elements = [{x : 20, y : 28 + i*8}].concat(wall.elements);
            }
    
            wall.elements = [{x : 25, y : 25}].concat(wall.elements);
    
            for (let i = 0; i < 4; i++){
                wall.elements = [{x : 33, y : 28 + i*8}].concat(wall.elements);
            }
    
            for (let i = 0; i < 2; i++){
                wall.elements = [{x : 33 + i*8, y : 68}].concat(wall.elements);
            }

          
            wall.filled = true;
            console.log("OK");
        }
        
        let start = touches.find((x:any) => {x.type === "start"});

        //console.log(state.win)
    
        if (start){
            console.log("ok");
            
        }

        let move = touches.find((x:any) => {x.type === "move"});
    
        if (move) {
            hero.position.x += move.delta.pageX / Constants.PSEUDO_PIXEL;
            hero.position.y += move.delta.pageY / Constants.PSEUDO_PIXEL;
        }
    
        for (let i = 0; i < wall.elements.length; i++){
            if (distance(hero.position.x,hero.position.y,wall.elements[i].x,wall.elements[i].y) < 0.7 + 5){
                console.log("!!!");
                hero.position.x = hero.startPos.x;
                hero.position.y = hero.startPos.y;
            }
        }
    
        if ( distance(hero.position.x,hero.position.y,finish.position.x, finish.position.y) < 0.7 + 5 ){
            state.win = true;
            console.log("You win!");
        }
    
        
    }
    return entities;
}

export {GameLoop} ;