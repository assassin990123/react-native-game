import { Constants } from './Constants'


const randomBetween = (min, max) => {
    return Math.floor(Math.random() *  (max - min + 1) + min);
}

const distance = (x1,y1,x2,y2) => {
    return Math.sqrt((x2 - x1)*(x2 - x1) + (y2 - y1)*(y2 - y1));
}



const GameLoop = (entities, { touches, dispatch, events}) => {

    
    const projectile = entities.projectile;
    const duck = entities.duck;
    const points = entities.points;

    if (projectile.amount != 0){
        let startPos =  projectile.startPos;
        let endPos =  projectile.endPos;
    
        if (!duck.startPos.filled){
            duck.startPos.x = duck.position.x;
            duck.startPos.y = duck.position.y;
            duck.startPos.filled = true;
        }
    
        if (projectile.launch){
            projectile.position.x += projectile.speed.x;
            projectile.position.y += projectile.speed.y;
            projectile.deg += 5;

    
            if (
                ((projectile.position.x - 1 > duck.position.x - 3 && projectile.position.x - 1 < duck.position.x + 3) ||
                (projectile.position.x + 1 > duck.position.x - 3 && projectile.position.x + 1 < duck.position.x + 3)) &&
                (projectile.position.y + 1 > duck.position.y - 3 && projectile.position.y + 1 < duck.position.y + 3)
                
            ){
                projectile.hited = true;
            }
            else if (projectile.position.x > 100 || projectile.position.x < -100 || projectile.position.y < -60 || projectile.position.y > 150){
                projectile.missed = true;
            }
    
    
        }
        else {
            let start = touches.find(x => x.type === "start");
            let move = touches.find(x => x.type === "move");
            let end = touches.find(x => x.type === "end");
    
            if (start) {
    
                startPos.x = start.event.pageX;
                startPos.y = start.event.pageY;
    
            }
            if (move){
                projectile.position.x += move.delta.pageX/Constants.PSEUDO_PIXEL;
                projectile.position.y += move.delta.pageY/Constants.PSEUDO_PIXEL;
            }
            if (end){
               
                endPos.x = end.event.pageX;
                endPos.y = end.event.pageY;
    
                projectile.speed.x = (endPos.x - startPos.x)/Constants.PSEUDO_PIXEL / -15;
                projectile.speed.y = (endPos.y - startPos.y)/Constants.PSEUDO_PIXEL / -15;
                
                projectile.launch = true;
            }
    
        }
    
        if (duck.dir.x ){
            if (duck.dir.y){
                duck.position.y += duck.speed.y;
                if (duck.position.y > duck.startPos.y + 8){
                    duck.dir.y = false;
                }
            }
            else{
                duck.position.y -= duck.speed.y;
                if (duck.position.y < duck.startPos.y - 8){
                    duck.dir.y = true;
                }
            }
            duck.position.x += duck.speed.x;
            if (duck.position.x > duck.startPos.x + 8){
                duck.dir.x = false;
            }
        }
        else{
            if (duck.dir.y){
                duck.position.y += duck.speed.y;
                if (duck.position.y > duck.startPos.y + 8){
                    duck.dir.y = false;
                }
            }
            else{
                duck.position.y -= duck.speed.y;
                if (duck.position.y < duck.startPos.y - 8){
                    duck.dir.y = true;
                }
            }
            duck.position.x -= duck.speed.x;
            if (duck.position.x < duck.startPos.x - 8){
                duck.dir.x = true;
            }
        }

        if (projectile.hited || projectile.missed){
            if (projectile.hited){
                points.score += 10;
            }
            console.log(points.score);
            if (projectile.amount != 1){
                projectile.position.x = 25;
                projectile.position.y = 75;
                projectile.speed.x = 0;
                projectile.speed.y = 0;
                duck.position.x = randomBetween(8,Constants.GRID_SIZE - 9);
                duck.position.y = randomBetween(8,Constants.GRID_SIZE - 9);
                duck.startPos.x = duck.position.x;
                duck.startPos.y = duck.position.y;
                projectile.launch = false;
                projectile.deg = 0;
                duck.dir.x = true;
                duck.dir.y = true;
                projectile.hited = false;
                
            }
            projectile.amount--;
            projectile.missed = false;
        }
    }
    

    return entities;
}

export {GameLoop} ;