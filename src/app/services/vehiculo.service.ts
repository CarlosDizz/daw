import {Injectable} from '@angular/core';
import {Vehiculo} from '../models/vehiculo.model';
import {VehiculosApi} from './vehiculo.global';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';


@Injectable()

export class VehiculoService{
	public url: string;
	public rol:string;
	

	constructor(
		public http: HttpClient
		){

		this.url = VehiculosApi.url;


	}

	listarVehiculos(){
		return this.http.get(this.url+'list');
			
		}

	addVehicle(vehiculo){
		let json = JSON.stringify(vehiculo);
		let params = 'json='+json;
		
		let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
		return this.http.post(this.url+'add', params ,{headers:headers});
	}
	delVehicle(id){
		return this.http.get(this.url+'delete/'+id);
	}
	selectVehicle(id){
		return this.http.get(this.url+'select-vehicle/'+id);
	}

	editVehicle(vehiculo){
		let json = JSON.stringify(vehiculo);
		let params = 'json='+json;
		let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
		return this.http.post(this.url+'edit', params, {headers:headers});

	}
	selectByRute(ruta){
		return this.http.get(this.url+'select-rute/'+ruta);
	}
	
}