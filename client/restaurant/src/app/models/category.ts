import { BaseModel } from './base-model';

export class Category extends BaseModel {

    public name: string;

    constructor(object) {
        super(object.id);
        Object.assign(this, object);
    }
}
