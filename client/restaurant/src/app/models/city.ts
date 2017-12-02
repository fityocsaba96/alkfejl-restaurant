import { BaseModel } from './base-model';

export class City extends BaseModel {

    public name: string;

    constructor(object) {
        super(object.id);
        Object.assign(this, object);
    }
}
