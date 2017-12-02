import { BaseModel } from './base-model';

export class Status extends BaseModel {

    public description: string;

    constructor(object) {
        super(object.id);
        Object.assign(this, object);
    }
}
