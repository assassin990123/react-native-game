import { Constants } from '../Constants';

const distance = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}

type TouchEvents = {
    touches: any, dispatch?: any, events?: any
};

export const GameLoop = (entities: any, { touches }: TouchEvents) => {
    let block: any = entities.block;
    let state: any = entities.state;

    if ( !state.win) {
        if ( !block.filled) {
            for (let i = 0; i < block.n; i++) {
                block.elements[0][i] = {
                    x: Constants.MAX_WIDTH / Constants.PSEUDO_PIXEL / 4, y: 70 - i * 5, width: 20 - i * 3
                };
            }

            block.filled = true;
        }

        let start: any = touches.find((x: any) => x.type === "start");

        if (start) {
            block.ely = -1;
            block.elx = -1;

            for (let i = 0; i < 3; i++) {
                if (block.elements[i].length != 0 && distance(block.elements[i][block.elements[i].length - 1].x, block.elements[i][block.elements[i].length - 1].y, start.event.pageX / Constants.PSEUDO_PIXEL, start.event.pageY / Constants.PSEUDO_PIXEL) < 5) {
                    block.elx = i;
                    block.ely = block.elements[i].length - 1;

                    block.startPos.x = block.elements[i][block.ely].x;
                    block.startPos.y = block.elements[i][block.ely].y;
                }
            }
        }

        if (block.ely != -1) {
            let move: any = touches.find((x: any) => x.type === "move");

            if (move) {
                block.elements[block.elx][block.ely].x += move.delta.pageX / Constants.PSEUDO_PIXEL * 1.7;
                block.elements[block.elx][block.ely].y += move.delta.pageY / Constants.PSEUDO_PIXEL * 1.7;
            }

            let end: any = touches.find((x: any) => x.type === "end");

            if (end) {
                let flagMoving: boolean = false;

                for (let i = 0; i < 3; i++) {
                    if (block.elements[block.elx][block.ely].x - Constants.MAX_WIDTH / Constants.PSEUDO_PIXEL / 4 * (i + 1) < 8 && block.elements[block.elx][block.ely].x - Constants.MAX_WIDTH / Constants.PSEUDO_PIXEL / 4 * (i + 1) > -8) {
                        if ((block.elements[i].length != 0 && block.elements[block.elx][block.ely].width < block.elements[i][block.elements[i].length - 1].width) || block.elements[i].length === 0) {
                            block.elements[block.elx][block.ely].x = Constants.MAX_WIDTH / Constants.PSEUDO_PIXEL / 4 * (i + 1);
                            block.elements[block.elx][block.ely].y = 70 - block.elements[i].length * 5;

                            block.elements[i][block.elements[i].length] = block.elements[block.elx].pop();

                            flagMoving = true;
                            break;
                        }
                    }
                }

                if ( !flagMoving) {
                    block.elements[block.elx][block.ely].x = block.startPos.x;
                    block.elements[block.elx][block.ely].y = block.startPos.y;
                }
            }
        }

        let win: boolean = true;

        for (let i = 0; block.elements[2].length === block.n && i < block.elements[2].length; i++) {
            if (block.elements[2][i].width !== (70 - i * 5)) {
                win = false;
                break;
            }
        }

        if ( !win) {
            state.win = true;
            state.update(20);
        }
    }

    return entities;
}
