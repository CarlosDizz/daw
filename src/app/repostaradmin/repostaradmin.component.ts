import {Component} from '@angular/core';
import {RepostarService} from '../services/repostar.service';
import {Usuario} from '../models/usuario.model';
import {Repostar} from '../models/repostar.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import { Router } from "@angular/router";
import {MenuComponent} from '../menu/menu.component';


@Component({
	selector: 'repostaradmin',
	templateUrl: 'repostaradmin.component.html',
	providers:[RepostarService],
	styleUrls: ['../style.css']
})

export class RepostarAdmin{
	public rol;
	public title;
	public lista: Array<Repostar>;
	constructor(
		public repostarService:RepostarService
		
		){
		this.title = "Repostar Admin Component";
		this.rol = sessionStorage.getItem('rolLocal');
		this.lista = new Array();

	}

	ngOnInit(){
		this.repostarService.listarTodos().subscribe(
			(result:any)=>{
				this.lista = result.data;
				
			}
		)
	}


}