class Address {
    _street: string = "";
    _city: string = "";
    _state: string = "";
    _zip: string = "";
    _number: number = 0;

    constructor(street: string, city: string, state: string, zip: string, number: number) {
        this._street = street;
        this._city = city;
        this._state = state;
        this._zip = zip;
        this._number = number;

        this.validate();
    }

    validate() {
        if (this._street.length === 0) {
            throw new Error("Street is required");
        }

        if (this._city.length === 0) {
            throw new Error("City is required");
        }

        if (this._state.length === 0) {
            throw new Error("State is required");
        }

        if (this._zip.length === 0) {
            throw new Error("Zip is required");
        }

        if (this._number === 0) {
            throw new Error("Number is required");
        }
    }



}