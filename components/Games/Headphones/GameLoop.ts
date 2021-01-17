import { Constants } from '../Constants';

const randomBetween = (min: number, max: number) => {
	return Math.floor(Math.random() *  (max - min + 1) + min);
}

const distance = (x1: number, y1: number, x2: number, y2: number) => {
	return Math.sqrt((x2 - x1)*(x2 - x1) + (y2 - y1)*(y2 - y1));
}

type Point = {
	x: number,
	y: number
}

const onSegment = (p: Point, q: Point, r: Point) => {
	if (q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) &&
		q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y))
		return true;

	return false;
}

const doIntersect = (p1: Point , q1: Point, p2: Point, q2: Point) => {
	// Find the four orientations needed for general and
	// special cases
	let o1 = orientation(p1, q1, p2);
	let o2 = orientation(p1, q1, q2);
	let o3 = orientation(p2, q2, p1);
	let o4 = orientation(p2, q2, q1);

	// General case
	if (o1 != o2 && o3 != o4)
		return true;

	// Special Cases
	// p1, q1 and p2 are colinear and p2 lies on segment p1q1
	if (o1 == 0 && onSegment(p1, p2, q1)) return true;

	// p1, q1 and q2 are colinear and q2 lies on segment p1q1
	if (o2 == 0 && onSegment(p1, q2, q1)) return true;

	// p2, q2 and p1 are colinear and p1 lies on segment p2q2
	if (o3 == 0 && onSegment(p2, p1, q2)) return true;

	// p2, q2 and q1 are colinear and q1 lies on segment p2q2
	if (o4 == 0 && onSegment(p2, q1, q2)) return true;

	return false; // Doesn't fall in any of the above cases
}

const orientation = (p: Point, q: Point, r: Point) => {
	let val = (q.y - p.y) * (r.x - q.x) -
		(q.x - p.x) * (r.y - q.y);

	if (val == 0)
		return 0;

	return val > 0 ? 1 : 2;
}

type TouchEvents = {
	touches:   any,
	dispatch?: any,
	events?:   any
};

export const GameLoop = (entities: any, { touches }: TouchEvents) => {
	let node = entities.node;
	let state = entities.state;

	if (!state.win) {
		if (!node.filled) {
			for (let i = 0; i < node.length; i++){
				node.elements = [{x: randomBetween(0,45), y: randomBetween(0,75)}].concat(node.elements);
			}

			node.filled = true;
		}

		let start = touches.find((x: any) => x.type === "start");

		if (start) {
			node.el = -1;
			for (let i = 0; i < node.elements.length; i++){
				if (distance(node.elements[i].x,node.elements[i].y,start.event.pageX / Constants.PSEUDO_PIXEL,start.event.pageY / Constants.PSEUDO_PIXEL) < 5){
					node.el = i;
				}
			}
		}

		let move = touches.find((x: any) => x.type === "move");

		if (move) {
			if (node.el != -1){
				node.elements[node.el].x += move.delta.pageX / Constants.PSEUDO_PIXEL;
				node.elements[node.el].y += move.delta.pageY / Constants.PSEUDO_PIXEL;
			}
		}

		let end = touches.find((x: any) => x.type === "end");

		if (end) {
			let unintersect = false;

			for (let i = 0; i < node.elements.length - 1; i++){

				for (let j = 0; j < node.elements.length - 1 ; j++){
					if (i != j && i != j+1 && i != j-1){
						if (doIntersect(node.elements[i],node.elements[i+1], node.elements[j], node.elements[j+1])){
							unintersect = true
						}
					}
				}

			}

			if (!unintersect) {
				state.win = true;
				entities.update();
				console.log(entities);
				console.log("You win!");
			}
		}

	}

	return entities;
}
