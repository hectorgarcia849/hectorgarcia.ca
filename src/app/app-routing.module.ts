import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {AppComponent} from './app.component';

const appRoutes: Routes = [
  // {path: '', redirectTo: '/home', pathMatch: 'full', data: {state: 'top', authRequired: false}},
  // {path: 'home', component: AppComponent, children: [], data: {state: 'top', authRequired: false}},
  // {path: 'about', loadChildren: './about/about.module#AboutModule', data: {state: 'top', authRequired: false}},
  // {path: 'upload-project', loadChildren: './upload-project/upload-project.module#UploadProjectModule', data: {state: 'top', authRequired: true}},
  // {path: 'portfolio', loadChildren: './portfolio/portfolio.module#PortfolioModule', data: {state: 'top', authRequired: false}},
  // {path: 'contact', loadChildren: './contact/contact.module#ContactModule', data: {state: 'middle', authRequired: false}},
  // {path: '**', redirectTo: '/home', pathMatch: 'full', data: {state: 'middle', authRequired: false}}

  {path: '', redirectTo: '#welcome', pathMatch: 'full', data: {state: 'top', authRequired: false}},
  {path: '#welcome', pathMatch: 'full', component: AppComponent, data: { state: 'top', authRequired: false}},
  {path: '#about', pathMatch: 'full', component: AppComponent, data: { state: 'top', authRequired: false}},
  {path: '#portfolio', pathMatch: 'full', component: AppComponent, data: {state: 'top', authRequired: false}},
  {path: '#contact', pathMatch: 'full', component: AppComponent, data: {state: 'top', authRequired: false}},
  {path: '**', redirectTo: '#welcome', pathMatch: 'full', data: {state: 'top', authRequired: false}}
];

const excludeLast = appRoutes.length - 1;
export const routes: {path: string, state: string, authRequired: boolean}[] = appRoutes.slice(0, excludeLast)
  .map((route) => {
    const path = route.path;
    console.log(path);
    const state = route.data.state;
    const authRequired = route.data.authRequired;
    return {path, state, authRequired};
  });

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, anchorScrolling: 'enabled'})
  ],
  exports: [RouterModule],
  declarations: []
})

export class AppRoutingModule {}
