import NotificationError from "../../@shared/notification/notification.error";
import Entity from "../../@shared/entity/entity.abstract";
import ProductValidatorFactory from "../factory/product.validator.factory";

export default class Product extends Entity {
    constructor(id: string, name: string, price: number) {
        super();
        this._id = id;
        this._name = name;
        this._price = price;
        this.validate();

        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors());
        }
    }

    private _name: string;

    get name(): string {
        return this._name;
    }

    private _price: number;

    get price(): number {
        return this._price;
    }

    validate() {
       ProductValidatorFactory.create().validate(this);
    }


    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    changePrice(price: number) {
        this._price = price;
        this.validate();
    }
}