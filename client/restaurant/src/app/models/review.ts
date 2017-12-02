import { BaseModel } from './base-model';
import { Product } from './product';
import { User } from './user';

export class Review extends BaseModel {

    public createDate: number;
    public stars: number;
    public description: string;
    public user: User;
    public product: Product;

    constructor(object) {
        super(object.id);
        Object.assign(this, object);
    }
}
