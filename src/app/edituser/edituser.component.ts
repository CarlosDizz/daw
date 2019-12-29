import {Component} from '@angular/core';
import {UsuarioService} from '../services/usuario.service';
import {Usuario} from '../models/usuario.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import { Router } from "@angular/router";
import {MenuComponent} from '../menu/menu.component';
import { ActivatedRoute, Params } from '@angular/router';



@Component({
	selector: 'edituser',
	templateUrl: '../newuser/newuser.component.html',
	providers:[UsuarioService],
	styleUrls: ['../style.css']
})

export class EditUser{
	public title:string;
	public rol:string;
	public usuario:Usuario;
	public userRute:any;
	public boton:string;

	constructor(
		private router:Router,
		private _usuarioService:UsuarioService,
		private activeRute: ActivatedRoute
		){
		this.title = "Editar usuario";
		this.boton = "Editar";
		this.rol = sessionStorage.getItem('rolLocal');



	}
	ngOnInit(){
		this.usuario = new Usuario('','','','','','');
		this.rol = sessionStorage.getItem('rolLocal');
		this.activeRute.params.subscribe(
			(result:any)=>{
				this.userRute = result.ruta;
			}	
			);
		this._usuarioService.selectusuario(this.userRute).subscribe(
			(result: any)=>{
				this.usuario = result.user;
			}, error=>{
				this.router.navigate(['inicio']);
			}
		);

	}

	onSubmit(){
		console.log(this.usuario);
		this._usuarioService.editarUsuario(this.usuario).subscribe(
				(result:any)=>{
					alert(result.message);
					this.router.navigate(['inicio']);
				}, error =>{
					console.log(error);
				}

			);
	}
}