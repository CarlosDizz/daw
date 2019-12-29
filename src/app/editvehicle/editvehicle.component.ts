import {Component} from '@angular/core';
import {VehiculoService} from '../services/vehiculo.service';
import {Vehiculo} from '../models/vehiculo.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import { Router } from "@angular/router";
import {MenuComponent} from '../menu/menu.component';
import { ActivatedRoute, Params } from '@angular/router';




@Component({
	selector: 'editvehicle',
	templateUrl: '../addvehicle/addvehicle.component.html',
	providers:[VehiculoService],
	styleUrls: ['../style.css']
})

export class EditVehicle{
	public title: string;
	public vehiculo: Vehiculo;
	public boton: string;
	public idVehicle: string;

	constructor(
		private router: Router,
		private activeRoute: ActivatedRoute, 
		private _vehiculoService:VehiculoService
		){
		this.title = "Editar Vehiculo";
		this.vehiculo = new Vehiculo('','','','','','','','','','','','','');
		this.boton = "Editar Vehiculo";
	}

	ngOnInit(){
		this.activeRoute.params.subscribe(
			(result:any)=>{
				this.idVehicle = result.id;
				
				}
			);
		this._vehiculoService.selectVehicle(this.idVehicle).subscribe(
				(result:any)=>{

					this.vehiculo = result.user;
					
				}
			);
	}

	onSubmit(){
		this._vehiculoService.editVehicle(this.vehiculo).subscribe(
				(result:any)=>{
					alert(result.message);
					this.router.navigate(['../vehiculos']);

				}
			);

	}


}