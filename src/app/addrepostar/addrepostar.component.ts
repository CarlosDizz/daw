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
import {Repostar} from '../models/repostar.model';
import {RepostarService} from '../services/repostar.service';


@Component({
	selector: 'addrepostar',
	templateUrl: 'addrepostar.component.html',
	providers:[VehiculoService, UsuarioService, RepostarService],
	styleUrls: ['../style.css']
})
export class AddRepostar{
	public title:string;
	public rol:string;
	public ruta:string;
	public repostaje:Repostar;
	public boton:string;
	public listaUsuarios:Array<Usuario>;
	public listaVehiculos:Array<Vehiculo>;
	public miVehiculo:Array<any>;
	public miModelo:string;
	public miMatricula:string;
	public otroVehiculo:string;
	public hidden:string;

	constructor(
		private _repostarService: RepostarService,
		private _usuarioService: UsuarioService,
		private _vehiculoService: VehiculoService,
		private router: Router
		){
		this.title = "Añadir Repostaje";
		this.rol = sessionStorage.getItem('rolLocal');
		this.ruta = sessionStorage.getItem('rutaLocal');
		this.repostaje = new Repostar('','','','','','');
		this.repostaje.conductor = this.ruta;
		this.boton = "Añadir";
		this.miVehiculo = new Array('');
		this.otroVehiculo ="";
		this.hidden="hidden";	
		if (this.rol == undefined) {
			this.router.navigate(['/login']);
		}
		this._usuarioService.listarUsuarios().subscribe(
			(result:any)=>{
				
				this.listaUsuarios = result.data;
			}

			);
		this._vehiculoService.selectByRute(this.ruta).subscribe(
			(result:any)=>{
				
				
					this.miVehiculo=result.data;
					if(this.miVehiculo[0].matricula){
					this.repostaje.vehiculo = this.miVehiculo[0].matricula;
					this.miModelo = this.miVehiculo[0].modelo;
					this.miMatricula = this.miVehiculo[0].matricula;
						
				
				}
				
			}
			);
		this._vehiculoService.listarVehiculos().subscribe(
			(result:any)=>{
				this.listaVehiculos = result.data;
				for(var i=0; i< this.listaVehiculos.length; i++ ){
					if (this.repostaje.vehiculo == this.listaVehiculos[i].matricula) {
						this.listaVehiculos.splice(i,1);
					}
				}

			}
			);


		

	}
	onSubmit(){
		var currentDate= new Date();
		this.repostaje.hora = currentDate.getTime();
		this._repostarService.addRepostar(this.repostaje).subscribe(
			(result:any)=>{
				alert(result.message);
				this.router.navigate(['/inicio']);
			}
			);

	}

	otroMotivo(){
		if (this.repostaje.vehiculo == '') {
			this.hidden = 'aviso';
		}
	}
	darMotivo(){
		this.hidden="hidden";
		this.repostaje.vehiculo = this.otroVehiculo;
		

	}


}