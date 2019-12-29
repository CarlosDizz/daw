import {Component} from '@angular/core';
import {UsuarioService} from '../services/usuario.service';
import {Usuario} from '../models/usuario.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import { Router } from "@angular/router";
import {MenuComponent} from '../menu/menu.component';
import {Vehiculo} from '../models/vehiculo.model';
import {VehiculoService} from '../services/vehiculo.service';

@Component({
	selector: 'vehiculos',
	templateUrl: 'vehiculos.component.html',
	providers:[VehiculoService],
	styleUrls: ['../style.css']
})

export class VehiculosComponent{
	public title:string;
	public lista: Array<any>;
	public vehiculo: Vehiculo;
	public rol: string;
	public currentDate: any;
	public warningDate: any;
	public hidden:string;
	public aBorrar:string;
	constructor(
		private _vehiculoService: VehiculoService
		){
		this.title = "Listado de vehiculos";
		this.vehiculo = new Vehiculo('','','','','','','','','','','','','',);
		this.currentDate = new Date();
		this.warningDate = new Date();

		this.warningDate = this.currentDate.getTime();
		this.warningDate = this.warningDate + (86400000*30);
		this.hidden = '';

	
		

	}
	ngOnInit(){
		this.rol = sessionStorage.getItem('rolLocal');
		this._vehiculoService.listarVehiculos().subscribe(
			(result : any)=>{
				
				
				for (var i = 0; i < result.data.length; i++) {
					result.data[i].itv = Date.parse(result.data[i].itv);
					result.data[i].seguro = Date.parse(result.data[i].seguro);
					result.data[i].extintor = Date.parse(result.data[i].extintor);
					result.data[i].tacografo = Date.parse(result.data[i].tacografo);
					result.data[i].atp = Date.parse(result.data[i].atp);
					result.data[i].termografo = Date.parse(result.data[i].termografo);
					result.data[i].transporte = Date.parse(result.data[i].transporte);
				}
				
				this.lista = result.data;
			}, error=>{
				console.log(error);
			}

			);
	}
	prueba(prueba){
		console.log(prueba);
	}

	compararFechas(fecha){

		console.log(fecha);
	}
	cambiarHidden(id){
		this.hidden = "aviso";
		this.aBorrar = id;
	}
	descambiaHidden(){
		this.hidden="";
		this.aBorrar ="";
	}
	borrarVehiculo(){
		this._vehiculoService.delVehicle(this.aBorrar).subscribe(
				(result:any)=>{
					alert(result.message);
					this.ngOnInit();
					this.hidden = "";
				}
			);
	}



}