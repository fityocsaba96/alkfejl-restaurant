import { BaseModel } from './base-model';
import { Category } from './category';
import { Review } from './review';

export class Product extends BaseModel {

    public name: string;
    public description: string;
    public price: number;
    public category: Category;
    public reviews: Review[];

    constructor(object) {
        super(object.id);
        Object.assign(this, object);
    }
}
