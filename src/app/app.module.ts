import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './componente/header/header.component';
import { FooterComponent } from './componente/footer/footer.component';
import { ClienteComponent } from './componente/cliente/cliente.component';
import { HttpClientModule} from '@angular/common/http';
import { ClienteFormComponent } from './componente/cliente/cliente-form.component';

import { PaginatorComponent } from './componente/paginator/paginator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetalleComponent } from './componente/cliente/detalle.component';
import { LoginComponent } from './seguridadad/componente/login.component';
import { FacturaDetalleComponent } from './facturas/componente/factura-detalle/factura-detalle.component';
import { FacturasComponent } from './facturas/componente/factura-detalle/facturas.component';
// para la auto busqueda con angular material
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClienteComponent,
    ClienteFormComponent,
    PaginatorComponent,
    DetalleComponent,
    LoginComponent,
    FacturaDetalleComponent,
    FacturasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
