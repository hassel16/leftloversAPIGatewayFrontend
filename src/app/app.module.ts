import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ServiceuebersichtComponent } from './components/serviceuebersicht/serviceuebersicht.component';
import { ServiceinstanceuebersichtComponent } from './components/serviceinstanceuebersicht/serviceinstanceuebersicht.component';
import { ServiceinstancedetailsComponent } from './components/serviceinstancedetails/serviceinstancedetails.component';
import { RouterService } from './services/routerService/router.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    ServiceuebersichtComponent,
    ServiceinstanceuebersichtComponent,
    ServiceinstancedetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [RouterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
