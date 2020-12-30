import { Entity } from './Entity';

export class Game extends Entity {
    _lastTimeTick: number = 0;
    _entities: Entity[] = [];

    constructor() {
        super();
    }

    addEntity(entity: Entity) {
        this._entities.push(entity);
    }

    update() {
        const deltaTime: number = (Date.now() - this._lastTimeTick) / 1000;
        super.update(deltaTime);

        for (const entity of this._entities) {
            entity.update(deltaTime);
        }
    }

    awake() {
        super.awake();

        for (const entity of this._entities) {
            entity.awake();
        }

        this._lastTimeTick = Date.now();
        this.update();
    }
}
