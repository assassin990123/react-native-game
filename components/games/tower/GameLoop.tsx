import { Constants } from './Constants'


const randomBetween = (min, max) => {
    return Math.floor(Math.random() *  (max - min + 1) + min);
}

const distance = (x1,y1,x2,y2) => {
    return Math.sqrt((x2 - x1)*(x2 - x1) + (y2 - y1)*(y2 - y1));
}



const GameLoop = (entities, { touches, dispatch, events}) => {

    let block = entities.block;
    let state = entities.state;

    if (!state.win){
        if (!block.filled){
        
            for (let i = 0; i < block.n; i++){
                block.elements[0][i] = {x : Constants.MAX_WIDTH / Constants.PSEUDO_PIXEL / 4, y : 70 - i*5, width : 20 - i*3};
            }
    
            // for (let i = 0; i < block.length[0]; i++){
            //     block.elements[1,i] = {x : 0,y : 0,width : 0};
            //     block.elements[2,i] = {x : 0,y : 0,width : 0};
            // }
            
            //console.log(block.elements);
    
            block.filled = true;
            //console.log("OK");
        }
    
    
        let start = touches.find(x => x.type === "start");
        
        if (start) {
            //
            block.ely = -1;
            block.elx = -1;
            //let min = 10;
            for (let i = 0; i < 3; i++){
                //for ( let j = 0; j < block.elements[i].length; j++){

                    if (block.elements[i].length != 0 && distance(block.elements[i][block.elements[i].length - 1].x,block.elements[i][block.elements[i].length - 1].y,start.event.pageX / Constants.PSEUDO_PIXEL,start.event.pageY / Constants.PSEUDO_PIXEL) < 5){
                        // if (i < min){
                        //     min = i;
                        // }
                        block.elx = i;
                        block.ely = block.elements[i].length - 1;

                        block.startPos.x = block.elements[i][block.ely].x;
                        block.startPos.y = block.elements[i][block.ely].y;

                        //console.log(block.elx,block.ely);
                    }
                //}
            }
            
            
            
            //console.log(node.ely);
            
        }
        if (block.ely != -1){
            let move = touches.find(x => x.type === "move");
        
            if (move) {
                
                block.elements[block.elx][block.ely].x += move.delta.pageX / Constants.PSEUDO_PIXEL * 1.7; 
                block.elements[block.elx][block.ely].y += move.delta.pageY / Constants.PSEUDO_PIXEL * 1.7;
                //console.log(block.elements[block.elx][block.ely].x - Constants.MAX_WIDTH/ Constants.PSEUDO_PIXEL / 4 * (3))
                
            }
            
            let end = touches.find(x => x.type === "end")
        
            if (end){


                let flagMoving = false;
                
                for (let i = 0; i < 3; i++){

                    // console.log(i);
                    // console.log(block.elx,block.ely);
                    // console.log(block.elements);
                    if (
                        (block.elements[block.elx][block.ely].x - Constants.MAX_WIDTH/ Constants.PSEUDO_PIXEL / 4 * (i+1)  < 8 &&
                        block.elements[block.elx][block.ely].x - Constants.MAX_WIDTH / Constants.PSEUDO_PIXEL / 4 * (i+1) > -8) &&
                        ((block.elements[i].length != 0 &&
                        block.elements[block.elx][block.ely].width < block.elements[i][block.elements[i].length - 1].width) ||
                        block.elements[i].length === 0)
                    ){
                        
                        block.elements[block.elx][block.ely].x = Constants.MAX_WIDTH / Constants.PSEUDO_PIXEL / 4 * (i+1);
                        block.elements[block.elx][block.ely].y = 70 - block.elements[i].length * 5;
                        //console.log(block.length[i]);
        
                        //block.elements[1,block.length[block.elx]] = block.elements.shift();
        
                        //это было старое решение
                        //block.elements[i][block.elements[i].length] = block.elements[block.elx][block.elements[block.elx].length - 1];
                        //block.elements[block.elx].pop();

                        block.elements[i][block.elements[i].length] = block.elements[block.elx].pop();

                        //block.length[i]++;
                        // console.log(block.length[i]);
                        // console.log(block.length);
        
        
                        // for(let j = 0; j < block.elements[i].length - 1; j++){
                        //     block.elements[block.elx][j] = block.elements[block.elx][j+1];
                        // }
                        //block.elements[block.elx].length--;
                        //block.elements[1,block.elements[block.elx,block.ely].length[block.elx]] = [block.elements1.shift()].concat(block.elements2);
                        

                        flagMoving = true;
                        break;
                        
                        
                    }
                }  
                if (!flagMoving){
                    block.elements[block.elx][block.ely].x = block.startPos.x;
                    block.elements[block.elx][block.ely].y = block.startPos.y;  
                }
                            
            }
        }

        let noWin = true;

        for (let i = 0; block.elements[2].length === block.n && i < block.elements[2].length; i++){
            if (!(block.elements[2][i].width === (70 - i*5))){
                noWin = false;
                break;
            }
        }
        if (!noWin){
            console.log("You win!");
            state.win = true;
        }
    
    }
    




    return entities;
}

export {GameLoop} ;