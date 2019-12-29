import {Component} from '@angular/core';
import {UsuarioService} from '../services/usuario.service';
import {Usuario} from '../models/usuario.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import { Router } from "@angular/router";
import {MenuComponent} from '../menu/menu.component';


@Component({
	selector: 'newuser',
	templateUrl: 'newuser.component.html',
	providers:[UsuarioService],
	styleUrls: ['../style.css']
})

export class NewuserComponent{
	public rol:string;
	public title:string;
	public usuario:Usuario;
	public boton:string;
	constructor(
		private router : Router,
		private _usuarioService: UsuarioService
		){
		this.title = "Crear nuevo usuario";
		this.boton = "Crear";

		this.rol = sessionStorage.getItem('rolLocal');
		if (this.rol != "admin") {
			alert('Has intentando entrar en una sección que solo es para administradores.');
			sessionStorage.setItem('rolLocal','');
			this.router.navigate(['./']);
		}
		this.usuario = new Usuario('','','','','','');

	}

	ngOninit(){

	}

	onSubmit(){
		this.usuario.ruta = String(this.usuario.ruta);
		switch (this.usuario.rol) {
			case "almacenista":
				this.usuario.ruta = 'A'+this.usuario.ruta;
				break;
			case "repartidor":
				this.usuario.ruta = 'R'+this.usuario.ruta;
				break;
			case "comercial":
				this.usuario.ruta = 'C'+this.usuario.ruta;
				break;
			case "supervisor":
				this.usuario.ruta = 'S'+this.usuario.ruta;
				break;
			default:
				this.usuario.ruta = this.usuario.ruta;
				break;
		}
		this._usuarioService.crearUsuario(this.usuario).subscribe(
				(result:any)=>{
					alert(result.message);
					this.router.navigate(['inicio']);
				}, error =>{
					console.log(error);
				}

			);

	}
}