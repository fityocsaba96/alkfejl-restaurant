import { BaseModel } from './base-model';
import { User } from './user';
import { Status } from './status';

export class Order extends BaseModel {

    public createDate: number;
    public note: string;
    public user: User;
    public status: Status;

    constructor(object) {
        super(object.id);
        Object.assign(this, object);
    }
}
