import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';



//Componentes

import {Login} from './login/login.component';
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

const appRoutes: Routes =[
	{path: '', component: Login},
	{path:'inicio', component:InicioComponent},
	{path: 'newuser', component: NewuserComponent},
	{path: 'edituser/:ruta', component: EditUser, pathMatch: 'full'},
	{path: 'vehiculos', component: VehiculosComponent},
	{path: 'addvehicle', component: AddVehicle},
	{path: 'editvehicle/:id',component: EditVehicle},
	{path: 'repostaradmin', component: RepostarAdmin},
	{path: 'addrepostar', component: AddRepostar},
	{path: 'editrepostar/:id', component: EditRepostar},
	{path: 'abonosadmin', component: AbonosAdmin},
	{path: 'addabono', component:AddAbono},
	{path:'**', component: Login}
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);