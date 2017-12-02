import { BaseModel } from './base-model';
import { City } from './city';

export class Restaurant extends BaseModel {

    public zipCode: number;
    public address: string;
    public openHourWeekday: number;
    public closeHourWeekday: number;
    public openHourWeekend: number;
    public closeHourWeekend: number;
    public phoneNumber: string;
    public city: City;

    constructor(object) {
        super(object.id);
        Object.assign(this, object);
    }
}
