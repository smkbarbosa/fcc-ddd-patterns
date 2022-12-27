class Customer{
  _id:string;
  _name:string;
  _address:string;
  _active:boolean = true;

  constructor(id: string, name: string, address: string){
    this._id = id;
    this._name = name;
    this._address = address;
  }

  // Ao inves de usar getters and setters no dominio da apĺicação, usar funções que tenham relação com a regra de negócio
  // da classe, que representem o que ela deve fazer
  changeName(name: string) {
    this._name;
  }

  activate() {
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
