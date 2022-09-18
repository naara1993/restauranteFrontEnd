import { Menu } from "../models/menu";

export class OrdenDetalle{
constructor(public id:number,public cantidad:number,public nombre:string,public imagen:string,public precio:number,public total:number,public menu:Menu){
}

private _menu:Menu;


get Menu(): Menu {
    return this._menu;
}
set Menu(value: Menu) {
    this._menu = value;
}
}