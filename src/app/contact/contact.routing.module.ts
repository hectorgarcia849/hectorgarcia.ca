import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContactComponent} from './contact.component';

const contactRoutes: Routes = [
  {path: '', component: ContactComponent}
];

@NgModule({
  imports: [RouterModule.forChild(contactRoutes)],
  exports: [RouterModule],
  providers: []
})

export class ContactRoutingModule {}
