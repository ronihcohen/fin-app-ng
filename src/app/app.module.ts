import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { BalanceTableComponent } from './balance-table/balance-table.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BalanceTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  bootstrap: [AppComponent],
  providers: [AngularFirestore, AngularFireAuth]
})
export class AppModule { }
