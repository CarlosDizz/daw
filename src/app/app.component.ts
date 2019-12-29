import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public rol: string;
  constructor(){
  	if (sessionStorage.getItem('rolLocal')) {
  		this.rol = sessionStorage.getItem('rolLocal');
  	} else {
  		this.rol = "";
  	}

  }
  
}
