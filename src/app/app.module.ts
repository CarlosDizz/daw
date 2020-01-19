import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {routing, appRoutingProviders} from './app.routing';
import {Login} from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import {MenuComponent} from './menu/menu.component';
import {NewuserComponent} from './newuser/newuser.component';
import {InicioComponent} from './inicio/inicio.component';
import {EditUser} from './edituser/edituser.component';
import {VehiculosComponent} from './vehiculos/vehiculos.component';
import {AddVehicle} from './addvehicle/addvehicle.component';
import {EditVehicle} from './editvehicle/editvehicle.component';
import {RepostarAdmin} from './repostaradmin/repostaradmin.component';
import {AddRepostar} from './addrepostar/addrepostar.component';
import {EditRepostar} from './editrepostar/editrepostar.component';
import {AbonosAdmin} from './abonosadmin/abonosadmin.component';
import {AddAbono} from './addabono/addabono.component';


@NgModule({
  declarations: [
    AppComponent,
    Login,
    MenuComponent,
    NewuserComponent,
    InicioComponent,
    EditUser,
    VehiculosComponent,
    AddVehicle,
    EditVehicle,
    RepostarAdmin,
    AddRepostar,
    EditRepostar,
    AbonosAdmin,
    AddAbono
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing  
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
