import Address from '../value-object/address';
import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";


// a entidade sempre vai ter que representar o estado correto do elemento
// uma entidade por padrão sempre tem que se autovalidar
export default class Customer extends Entity {
    private _address!: Address;
    private _active: boolean = false;

    constructor(id: string, name: string) {
        super();
        this._id = id;
        this._name = name;
        this.validate();

        if (this.notification.hasErrors()) {
            // @ts-ignore
            throw new NotificationError(this.notification.getErrors());
        }
    }

    private _name: string;

    get name(): string {
        return this._name;
    }

    private _rewardPoints: number = 0;

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    get Address(): Address {
        return this._address;
    }

    // Ao inves de usar getters and setters no dominio da apĺicação, usar funções que tenham relação com a regra de negócio

    set Address(address: Address) {
        this._address = address;
    }

    validate() {
        if (this.id.length === 0) {
            this.notification.addError({
                context: "customer",
                message: "Customer id is required"
            });
        }

        if (this._name.length === 0) {
            this.notification.addError({
                context: "customer",
                message: "Customer name is required"
            });
        }
    }

    // da classe, que representem o que ela deve fazer
    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    activate() {
        if (this._address === undefined) {
            throw new Error("Address is mandatory to activate a customer");
        }
        this._active = true;
    }

    deactivate() {
        this._active = false
    }

    isActive(): boolean {
        return this._active;
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }

    changeAddress(address: Address) {
        this._address = address;
    }

    // get id(): string {
    // return this._id;
    // }

    // get name(): string {
    // return this._name;
    // }

    // get address(): string {
    // return this._address;
    // }

    // set name(name: string) {
    // this._name = name;
    // }

    // set address(address: string) {
    // this._address = address;
    // }

}
