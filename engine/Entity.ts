import { IUpdate } from './IUpdate';
import { IAwake } from "./IAwake";

export abstract class Entity implements IUpdate, IAwake {
    _components: IComponent[] = [];

    update(timeTick: number): void {
        console.log(timeTick);

        for (const component of this._components) {
            component.update(timeTick);
        }
    }

    awake() {
        for (const component of this._components) {
            component.awake();
        }
    }
}

export interface IComponent extends IUpdate, IAwake { }

