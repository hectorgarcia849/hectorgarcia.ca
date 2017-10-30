import {RouterModule, Routes} from '@angular/router';
import {AboutComponent} from './about.component';
import {NgModule} from '@angular/core';

const aboutRoutes: Routes = [
  {path: '', component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forChild(aboutRoutes)],
  exports: [RouterModule],
  providers: []
})

export class AboutRoutingModule {}
