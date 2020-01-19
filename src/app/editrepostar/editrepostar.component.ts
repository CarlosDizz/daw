import {Component} from '@angular/core';
import {RepostarService} from '../services/repostar.service';
import {Usuario} from '../models/usuario.model';
import {UsuarioService} from '../services/usuario.service';
import {VehiculoService} from '../services/vehiculo.service';
import {Vehiculo} from '../models/vehiculo.model';
import {Repostar} from '../models/repostar.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import { Router } from "@angular/router";
import {ActivatedRoute} from '@angular/router';
import {MenuComponent} from '../menu/menu.component';

@Component({
	selector: 'editrepostar',
	templateUrl: '../addrepostar/addrepostar.component.html',
	providers:[RepostarService, UsuarioService, VehiculoService],
	styleUrls: ['../style.css']
})

export class EditRepostar{
	public title:string;
	public repostaje:Repostar;
	public id:any;
	public boton:string;
	public rol:string;
	public hidden:string;
	public listaUsuarios:Array<Usuario>;
	public listaVehiculos:Array<Vehiculo>;
	public edit:boolean;
	public otroVehiculo:string;
	public vehiculo:Vehiculo;


	constructor(
		private router:Router,
		private activatedRoute: ActivatedRoute,
		private repostarService: RepostarService,
		private usuarioService: UsuarioService,
		private vehiculoService: VehiculoService
		){
		this.repostaje = new Repostar('','','','','','');
		this.vehiculo = new Vehiculo('','','','','','','','','','','','','');
		this.edit=true;
		this.hidden="hidden";
		this.rol = sessionStorage.getItem('rolLocal');
		this.boton="Editar";
		this.title = "Editar repostaje";
		this.id =this.activatedRoute.snapshot.paramMap.get('id');
		this.repostarService.seleccionID(this.id).subscribe(
				(result:any)=>{
					this.repostaje = result.data;
					console.log(this.repostaje);
				}
			);


	}
	ngOnInit(){
		this.usuarioService.listarUsuarios().subscribe(
			(result:any)=>{
				
				this.listaUsuarios = result.data;
			}

			);
		this.vehiculoService.listarVehiculos().subscribe(
			(result:any)=>{
				this.listaVehiculos = result.data;
				for(var i=0; i< this.listaVehiculos.length; i++ ){
					if (this.repostaje.vehiculo == this.listaVehiculos[i].matricula) {
						
					}
				}

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
	onSubmit(){
		this.repostarService.editRepostar(this.repostaje).subscribe(
			(result:any)=>{
				this.router.navigate(['/repostaradmin']);
			}

			);
	}
}