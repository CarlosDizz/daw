import {Injectable} from '@angular/core';
import {Usuario} from '../models/usuario.model';
import {UsuariosApi} from './usuarios.global';
import {RepostarApi} from '../services/repostar.global';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';


@Injectable()



export class RepostarService{
	public url:string;
	public rol:string;
	public urlRepostar:string;


	constructor(
			public http: HttpClient
		){
		this.url = UsuariosApi.url;
		this.urlRepostar = RepostarApi.url;
		
	}

	prueba(){
		alert('RepostarService');
	}
	listarTodos(){
		return this.http.get(this.urlRepostar+'listar-todos');
		
	}

	addRepostar(repostaje){
		let json = JSON.stringify(repostaje);
			let params = 'json='+json;
			let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
			return this.http.post(this.urlRepostar+'add', params ,{headers:headers});
	}

	borrarRepostar(id){
		return this.http.get(this.urlRepostar+'delete/'+id);
	}

	seleccionID(id){
		return this.http.get(this.urlRepostar+'select/'+id);
	}

	editRepostar(repostaje){
		let json = JSON.stringify(repostaje);
			let params = 'json='+json;
			let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
			return this.http.post(this.urlRepostar+'edit', params ,{headers:headers});
	}

}
