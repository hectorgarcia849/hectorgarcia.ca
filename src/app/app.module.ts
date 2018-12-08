import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { WelcomeComponent } from './welcome/welcome.component';
import 'hammerjs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialsModule} from './materials/materials.module';
import {ModalModule} from 'ngx-bootstrap';
import {NavigationService} from './services/navigation.service';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AuthenticationService} from './services/authentication.service';
import {ArticlesService} from './services/articles.service';
import { FeaturedArticlesComponent } from './featured-articles/featured-articles.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    WelcomeComponent,
    FeaturedArticlesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialsModule,
    ModalModule.forRoot(),
    AngularSvgIconModule
  ],
  providers: [NavigationService, AuthenticationService, ArticlesService],
  bootstrap: [AppComponent],
  exports: [],
  entryComponents: []
})
export class AppModule { }
