import {Component} from '@angular/core';
import {UsuarioService} from '../services/usuario.service';
import {Abono} from '../models/abono.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import { Router } from "@angular/router";
import {MenuComponent} from '../menu/menu.component';
import {AbonosService} from '../services/abonos.service';


@Component({
	selector: 'addabono',
	templateUrl: 'addabono.component.html',
	providers:[AbonosService],
	styleUrls: ['../style.css']
})

export class AddAbono{
public title:string;
public rol:string;
public ruta:string;
public lineasAbono: Array<any>;
public linea:Abono;
public listaComercial:Array<any>;
public comercial:string;
public comercialName:string;
public repartidor:string;
public repartidorName:string;
public listaRepartidores:Array<any>;
public listaComerciales:Array<any>;
public infoComercial:string;
public formAgente:string;
public tablaAbono:string;
public suma:number;


constructor(
	public abonoService:AbonosService,
	private router:Router
	){
	this.title="Añadir abonos"
	this.rol = sessionStorage.getItem('rolLocal');
	this.ruta = sessionStorage.getItem('rutaLocal');
	this.lineasAbono = new Array();
	this.linea = new Abono("","","","","","","","","","","");
	this.infoComercial = "hidden";
	this.formAgente = '';
	this.comercial = "";
	this.repartidor = "";
	this.tablaAbono = "hidden";
	this.suma=0;

}

ngOnInit(){
	this.abonoService.listarComerciales().subscribe(
		(result:any)=>{
			this.listaComercial = result.data;
			
		}
		);
	this.abonoService.listarRepartidores().subscribe(
		(result:any)=>{
			this.listaRepartidores = result.data;
		}
		);

}

goToLines(){
	this.abonoService.dimeNombre(this.comercial).subscribe(
		(result:any)=>{
			this.comercialName = result.user.nombre;
			
		}
		);
	this.abonoService.dimeNombre(this.repartidor).subscribe(
		(result:any)=>{
			this.repartidorName = result.user.nombre;
		}
		);
	this.linea.comercial = this.comercial;
	this.linea.reparto = this.repartidor;
	this.linea.autor = this.ruta;
	this.linea.tramitado = 'no';
	var today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	this.linea.fecha = date;
	this.formAgente = "hidden";
	this.infoComercial = "";
	

	
}

addLine(){
	this.lineasAbono.push(this.linea);
	this.linea = new Abono("","","","","","","","","","","");
	this.linea.comercial = this.comercial;
	this.linea.reparto = this.repartidor;
	this.linea.autor = this.ruta;
	this.linea.tramitado = 'no';
	let date:Date = new Date();
	this.linea.fecha=date.getTime();
	this.tablaAbono = "tablaAbono";
	
}


deleteline(i){
	this.lineasAbono.splice(i,1);
	if (this.lineasAbono.length == 0) {
		this.tablaAbono = "hidden";

	}
}

sendAbono(){
	
	for (var i=0; i < this.lineasAbono.length; i++){
		this.abonoService.addAbono(this.lineasAbono[i]).subscribe(
			(result:any)=>{
				this.lineasAbono.splice(i,1);
				this.suma=this.suma+1;
				console.log(this.suma);
			}
		);
	}
	alert('Has enviado un abono con '+this.lineasAbono.length+' lineas');
	this.router.navigate(['/inicio']);

}
}