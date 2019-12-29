import {Component} from '@angular/core';
import { Router } from "@angular/router";
@Component({
	selector: 'menu',
	templateUrl: 'menu.component.html',
	styleUrls: ['../style.css']
})

export class MenuComponent{
	public rol:string;

	constructor(
		private router: Router
		){
		this.rol = sessionStorage.getItem('rolLocal');
	}

	logout(){
		this.rol ="";
		sessionStorage.setItem('rolLocal','');
		sessionStorage.setItem('rutaLocal','');
		this.router.navigate(['/'])
	}


}