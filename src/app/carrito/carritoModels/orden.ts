import { NuevoUsuario } from "src/app/models/nuevo-usuario";

export class Orden{
//constructor(public id:number,public cantidad:number,public nombre:string,public imagen:string,public precio:number,public total:number){
constructor(public id:number,public numero:String,public fechaCreacion:Date,public fechaRecibida:Date,public tipoPago:string,public total:number,public nombre:String,public estado:string,public envio:boolean,public costoEnvio:number,public direccion:any,public usuario:NuevoUsuario){

}

}


