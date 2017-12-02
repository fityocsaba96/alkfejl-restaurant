import { BaseModel } from './base-model';
import { Order } from './order';
import { Product } from './product';

export class OrderProduct extends BaseModel {

    public quantity: number;
    public order: Order;
    public product: Product;

    constructor(object) {
        super(object.id);
        Object.assign(this, object);
    }
}
