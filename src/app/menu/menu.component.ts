import {Component} from '@angular/core';
import { Router } from "@angular/router";
@Component({
	selector: 'menu',
	templateUrl: 'menu.component.html',
	styleUrls: ['../style.css']
})

export class MenuComponent{
	public rol:string;
	public hidden:string

	constructor(
		private router: Router
		){
		this.rol = sessionStorage.getItem('rolLocal');
		this.hidden = 'hidden';
	}

	logout(){
		this.rol ="";
		sessionStorage.setItem('rolLocal','');
		sessionStorage.setItem('rutaLocal','');
		this.router.navigate(['/'])
	}
	mostrarMenu(){
		if(this.hidden == 'hidden'){
			this.hidden = 'navMovil'
		} else {
			this.hidden = 'hidden';
		}
	}


}