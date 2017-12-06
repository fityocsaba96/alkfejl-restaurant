import { BaseModel } from '../base-model';
import { Status } from '../status';
import { Product } from '../product';

export class OrderResponse extends BaseModel {

    public createDate: number;
    public note: string;
    public status: Status;
    public orderProducts: OrderProductResponse[];
    public total: number;

    constructor(object) {
        super(object.id);
        Object.assign(this, object);
    }
}

export class OrderProductResponse extends BaseModel {

    public quantity: number;
    public product: Product;

    constructor(object) {
        super(object.id);
        Object.assign(this, object);
    }
}

