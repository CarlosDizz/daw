import {Injectable} from '@angular/core';
import {Usuario} from '../models/usuario.model';
import {UsuariosApi} from './usuarios.global';
import {RepostarApi} from '../services/repostar.global';
import {AbonosApi} from '../services/abonos.global';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';


@Injectable()



export class AbonosService{
	public url:string;
	public rol:string;
	public urlRepostar:string;

	constructor(
		private http:HttpClient
		){
		this.url = AbonosApi.url;

	}

	serviceTest(){
		alert('ok');
	}

	listarSinValidar(){
		return this.http.get(this.url+'list-unvalidated');
	}

	selectAValidar(id){
		return this.http.get(this.url+'select-abono/'+id);
	}
	listarValidada(){
		return this.http.get(this.url+'list-validated');
	}

	validar(abonoEditado){
		let json = JSON.stringify(abonoEditado);
		let params = 'json='+json;
		
		let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
		return this.http.post(this.url+'validar', params ,{headers:headers});
	}
	addAbono(abonoEditado){
		let json = JSON.stringify(abonoEditado);
		let params = 'json='+json;
		
		let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
		return this.http.post(this.url+'add', params ,{headers:headers});
	}

	desvalidarAbono(id){
		return this.http.get(this.url+'desvalidar/'+id);
	}
	listarComerciales(){
		return this.http.get(this.url+'listar-comerciales');
	}
	listarRepartidores(){
		return this.http.get(this.url+'listar-repartidores');
	}
	dimeNombre(ruta){
		return this.http.get(this.url+'nombre/'+ruta);
	}

	





}
