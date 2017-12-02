import { BaseModel } from '../base-model';
import { Product } from '../product';

export class ReviewsResponse {

    public product: Product;
    public reviews: ReviewResponse[];

    constructor(object) {
        Object.assign(this, object);
    }
}

class ReviewResponse extends BaseModel {

    public createDate: number;
    public stars: number;
    public description: string;
    public userFirstName: string;
    public userLastName: string;

    constructor(object) {
        super(object.id);
        Object.assign(this, object);
    }
}
