import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full', data: {state: 'middle'}},
  {path: 'home', component: WelcomeComponent, children: [], data: {state: 'middle'}},
  {path: 'about', loadChildren: './about/about.module#AboutModule', data: {state: 'top'}},
  {path: 'articles', loadChildren: './blog/blog.module#BlogModule', data: {state: 'top'}},
  {path: 'portfolio', loadChildren: './portfolio/portfolio.module#PortfolioModule', data: {state: 'top'}},
  {path: 'contact', loadChildren: './contact/contact.module#ContactModule', data: {state: 'middle'}},
  {path: '**', redirectTo: '/home', pathMatch: 'full', data: {state: 'middle'}}
];

const excludeLast = appRoutes.length - 1;
export const routes: {path: string, state: string}[] = appRoutes.slice(0, excludeLast)
  .map((route) => {
    const path = route.path;
    const state = route.data.state;
    return {path, state};
  });

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule],
  declarations: []
})

export class AppRoutingModule {}
