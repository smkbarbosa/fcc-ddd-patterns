import Address from './address';


// a entidade sempre vai ter que representar o estado correto do elemento
// uma entidade por padrão sempre tem que se autovalidar
export default class Customer{
  _id:string;
  _name:string;
  _address!: Address;
  _active:boolean = false;


  constructor(id: string, name: string){
    this._id = id;
    this._name = name;
    this.validate();
  }

  validate() {
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }

    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
  }

  // Ao inves de usar getters and setters no dominio da apĺicação, usar funções que tenham relação com a regra de negócio
  // da classe, que representem o que ela deve fazer
  changeName(name: string) {
    this._name;
  }

  activate() {
    if (this._address !== undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false
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
