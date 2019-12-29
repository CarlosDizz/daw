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
	selector: 'addvehicle',
	templateUrl: 'addvehicle.component.html',
	providers:[VehiculoService, UsuarioService],
	styleUrls: ['../style.css']
})

export class AddVehicle{
	public title:string;
	public rol:string;
	public vehiculo:Vehiculo;
	public boton:string;
	public listaUsuarios: Array<any>;
	constructor(
			private router: Router,
			private _vehiculoService : VehiculoService,
			private _usuarioService : UsuarioService

		){
		this.title = "Añadir nuevo vehículo";
		this.rol = sessionStorage.getItem('rolLocal');
		this.boton = "Añadir Vehículo"
		this.vehiculo= new Vehiculo('','','','','','','','','','','','','',);
		this.listaUsuarios = [];

		
	}

	ngOnInit(){
		if (this.rol != "admin") {
			this.router.navigate(['inicio']);
		}

		this._usuarioService.listarUsuarios().subscribe(
			(result : any)=>{
				this.listaUsuarios = result.data;
				console.log(this.listaUsuarios);
			}

			);
	}
	onSubmit(){
		this._vehiculoService.addVehicle(this.vehiculo).subscribe(
				(result :any)=>{
					alert(result.message);
					this.router.navigate(['vehiculos']);
				}
			);
	}


}