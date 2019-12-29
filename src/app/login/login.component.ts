import {Component} from '@angular/core';
import {UsuarioService} from '../services/usuario.service';
import {Usuario} from '../models/usuario.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import { Router } from "@angular/router";


@Component({
	selector: 'login',
	templateUrl: 'login.component.html',
	providers:[UsuarioService],
	styleUrls: ['../style.css']
})

export class Login{
	public title:string;
	public usuario: Usuario;
	public logueado: string;
	public rol: string;
	public hidden:string;
	public aBorrar:any;
	public list:Array<any>;


	constructor(
			private _usuarioService : UsuarioService,
			private router : Router
		){
		
		this.title = "LOGIN";
		this.usuario = new Usuario('','','','','','');
		this.logueado= "";
		this.hidden="hidden";

		

	}

	ngOnInit(){
		this._usuarioService.listarUsuarios().subscribe(
				(result:any)=>{
					this.list = result.data;
					console.log(this.list);
				}
			);

	}

	

	
	onSubmit(){
		this._usuarioService.hacerLogin(this.usuario).subscribe(
			(result : any)=>{
				
				if (result.code == 200) {

					if (result.usuario != "Fallo") {
						this.usuario = result.usuario;
						this.logueado = "Exito";
						sessionStorage.setItem('rutaLocal', this.usuario.ruta);
						sessionStorage.setItem('rolLocal', this.usuario.rol);
						this.rol = sessionStorage.getItem('rolLocal');
						this.router.navigate(['inicio']);
						
					} else{
						this.logueado = "ErrorDatos";
					}
					
				}
			} , error=>{
				console.log(<any>error);
			}
			)
	}

	

	



}

	