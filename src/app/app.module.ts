import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import 'hammerjs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialsModule} from './materials/materials.module';
import {ModalModule, TooltipModule} from 'ngx-bootstrap';
import {NavigationService} from './services/navigation.service';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AuthenticationService} from './services/authentication.service';
import {ArticlesService} from './services/articles.service';
import { FeaturedArticlesComponent } from './featured-projects/featured-projects.component';
import {
  FileDropDirective, FileSelectDirective, FileUploader, FileUploaderOptions,
  FileUploadModule
} from 'ng2-file-upload';
import {FileUploaderService} from './services/file-uploader.service';
import {WelcomeComponent} from './welcome/welcome.component';
import {AboutModule} from './about/about.module';
import {ContactModule} from './contact/contact.module';
import {PortfolioModule} from './portfolio/portfolio.module';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    FeaturedArticlesComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialsModule,
    ModalModule.forRoot(),
    AngularSvgIconModule,
    AboutModule,
    PortfolioModule,
    ContactModule
  ],
  providers: [NavigationService, AuthenticationService, ArticlesService, FileUploaderService],
  bootstrap: [AppComponent],
  exports: [],
  entryComponents: []
})
export class AppModule { }
