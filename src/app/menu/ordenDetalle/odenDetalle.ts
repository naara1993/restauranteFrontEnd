import { Menu } from "../models/menu";
import { Orden } from './../../carrito/carritoModels/orden';

export class OrdenDetalle{
constructor(public id:number,public cantidad:number,public nombre:string,public imagen:string,public precio:number,public total:number,public menu:Menu,public orden:Orden){
}
}