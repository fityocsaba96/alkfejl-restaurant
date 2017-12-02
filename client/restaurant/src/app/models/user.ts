import { BaseModel } from './base-model';
import { Restaurant } from './restaurant';
import { City } from './city';

export class User extends BaseModel {

    public email: string;
    public lastName: string;
    public firstName: string;
    public zipCode: number;
    public address: string;
    public phoneNumber: string;
    public isAdmin: boolean;
    public restaurant: Restaurant;
    public city: City;

    constructor(object) {
        super(object.id);
        Object.assign(this, object);
    }
}

export enum Role {
    GUEST, USER, ADMIN
}
