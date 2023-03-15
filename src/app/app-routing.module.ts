import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteFormComponent } from './componente/cliente/cliente-form.component';
import { ClienteComponent } from './componente/cliente/cliente.component';
import { DetalleComponent } from './componente/cliente/detalle.component';
import { LoginComponent } from './seguridadad/componente/login.component';
import { AuthGuard } from './seguridadad/guard/auth.guard';
import { RolGuard } from './seguridadad/guard/rol.guard';

const routes: Routes = [
  {path: '', redirectTo: '/clientes', pathMatch: 'full'},

  {path: 'cliente', component: ClienteComponent},
  {path: 'cliente/page/:page', component: ClienteComponent},
  {path:'cliente/form',component:ClienteFormComponent,canActivate:[AuthGuard,RolGuard], data:{role:'ROLE_ADMIN'}},
  {path:'cliente/form/:id',component:ClienteFormComponent,canActivate:[AuthGuard, RolGuard],data:{role:'ROLE_ADMIN'}},
  {path:'cliente/ver/:id',component:DetalleComponent,canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],


exports: [RouterModule]
})
export class AppRoutingModule { }
