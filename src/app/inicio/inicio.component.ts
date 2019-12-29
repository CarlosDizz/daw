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
	selector: 'inicio',
	templateUrl: 'inicio.component.html',
	providers:[UsuarioService, VehiculoService],
	styleUrls: ['../style.css']
})

export class InicioComponent{
	public rol:string;
	public ruta:string;
	public usuario: Usuario;
	public hidden:string;
	public lista:Array<any>;
	public aBorrar: any;
	public misVehiculos: Array<any>;
	public currentDate: any;
	public warningDate: any;


	constructor(
		private router: Router,
		private _usuarioService: UsuarioService,
		private _vehiculoService: VehiculoService

		){
		this.usuario = new Usuario("","","","","","");
		this.hidden="hidden";
		this.aBorrar = null;
		this.misVehiculos = new Array();
		
		
	};

	ngOnInit(){
		this.currentDate = new Date();
		this.warningDate = new Date();

		this.warningDate = this.currentDate.getTime();
		this.warningDate = this.warningDate + (86400000*30);
		this.rol = sessionStorage.getItem('rolLocal');
		this.ruta = sessionStorage.getItem('rutaLocal');
		this.hidden = 'hidden';
		
		
		this._usuarioService.selectusuario(this.ruta).subscribe(
			(result : any)=>{
				this.usuario=result.user;
				
			}
		);
		if (this.rol == "admin") {
			this._usuarioService.listarUsuarios().subscribe(
			(result : any)=>{
				this.lista = result.data;
			
			}, error=>{
				console.log(error);
			}
			);
		}
		
		this._vehiculoService.selectByRute(this.ruta).subscribe(
			(result:any)=>{
				this.misVehiculos = result.data;
				for (var i = 0; i < this.misVehiculos.length; ++i) {
					this.misVehiculos[i].itv = Date.parse(this.misVehiculos[i].itv);
					this.misVehiculos[i].seguro = Date.parse(this.misVehiculos[i].seguro);
					this.misVehiculos[i].atp = Date.parse(this.misVehiculos[i].atp);
					this.misVehiculos[i].extintor = Date.parse(this.misVehiculos[i].extintor);
					this.misVehiculos[i].transporte = Date.parse(this.misVehiculos[i].transporte);
					this.misVehiculos[i].termografo = Date.parse(this.misVehiculos[i].termografo);
					this.misVehiculos[i].tacografo = Date.parse(this.misVehiculos[i].tacografo);


				}
			}, error=>{
				console.log(error);
			}

			);		
		
	}

	logout(){
		
		sessionStorage.removeItem('rutaLocal');
		sessionStorage.removeItem('rolLocal');
		this.rol="";
	}

	cambiaHidden(id){
		this.hidden = "aviso";
		this.aBorrar = id;
		
	}
	descambiaHidden(){
		this.hidden = "hidden";
		
	}
	borrarUsuario(){
		
		this._usuarioService.borrarusuario(this.aBorrar).subscribe(
			(result:any)=>{
				alert(result.message);
				this.router.navigate(['inicio']);
				this.ngOnInit();

				
			}, (error:any) =>{
				alert(error.message);
			}
			);
		this.hidden = "hidden";
	}
	editUser(editar){
		
		this.router.navigate(['edituser', editar]);
	}

	
}