import {Injectable} from '@angular/core';
import {Usuario} from '../models/usuario.model';
import {UsuariosApi} from './usuarios.global';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';


@Injectable()



export class UsuarioService{
	public nombre_usuario ="Servicio Usuario OK";
	public url:string;
	public rol:string;


	constructor(
			public http: HttpClient
		){
		this.url = UsuariosApi.url;
	}
		

		hacerLogin(usuario){
				let json = JSON.stringify(usuario);
				let params = 'json='+json;
				let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
				return this.http.post(this.url+'login', params, {headers:headers});

		}

		comprobarSession(): Observable<any>{
			return this.http.get(this.url+'sesion');
		}
		listarUsuarios(){
			
				return this.http.get(this.url+'listar-usuarios');
			 
		}
		borrarusuario(id){
			this.rol = sessionStorage.getItem('rolLocal');
			if(this.rol == 'admin'){

				return this.http.get(this.url+'delete-user/'+id);
			} else {
				alert('NOOOOO');
			}
		}

		selectusuario(ruta){
			return this.http.get(this.url+'select-user/'+ruta);
		}

		crearUsuario(usuario){
			let json = JSON.stringify(usuario);
			let params = 'json='+json;
			let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
			return this.http.post(this.url+'add-user', params ,{headers:headers});
		}
		editarUsuario(usuario){
			let json = JSON.stringify(usuario);
			let params = 'json='+json;
			let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
			return this.http.post(this.url+'edit-user', params ,{headers:headers});
		}



	


}
