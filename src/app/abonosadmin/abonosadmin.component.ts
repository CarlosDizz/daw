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
	selector: 'abonosadmin',
	templateUrl: 'abonosadmin.component.html',
	providers:[AbonosService],
	styleUrls: ['../style.css']
})

export class AbonosAdmin{
public title:string;
public listaSinValidar:Array<any>;
public litaValidada:Array<any>;
public hidden:string;
public hidden2:string
public abonoEditar:Abono;
public rol:string;


constructor(
	public abonoService:AbonosService
	){
	this.title="Administrador de Abonos"
	this.hidden ="hidden";
	this.hidden2 = "hidden";
	this.rol = sessionStorage.getItem('rolLocal');
	this.abonoEditar = new Abono('','','','','','','','','','','');
	
}

ngOnInit(){
	this.abonoService.listarSinValidar().subscribe(
		(result:any)=>{
			
			this.listaSinValidar = result.data;
			
		}
		);
	this.abonoService.listarValidada().subscribe(
		(result:any)=>{
			this.litaValidada = result.data;
			
		}
		);


}


detalleAbono(id){
	this.abonoService.selectAValidar(id).subscribe(
		(result:any)=>{
		 	this.abonoEditar = result.data;
		}

		);

	this.hidden="avisoAbono";
}
noValidar(){
	this.hidden="hidden";
	this.hidden2="hidden";
}

detalleAbono2(id){
	this.abonoService.selectAValidar(id).subscribe(
		(result:any)=>{
		 	this.abonoEditar = result.data;
		 	
		}

		);

	this.hidden2="avisoAbono2";
}

validarAbono(){
	
	this.abonoService.validar(this.abonoEditar).subscribe(
		(result:any)=>{
			
			this.ngOnInit();
			this.hidden = "hidden";

		}
		);
}
desvalidar(id){
	this.abonoService.desvalidarAbono(id).subscribe(
		(result:any)=>{
			
			this.ngOnInit();
		}, error=>{
			this.ngOnInit();
		}
		);
}

}