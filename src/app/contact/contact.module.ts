import {NgModule} from '@angular/core';
import {ContactComponent} from './contact.component';
import {CommonModule} from '@angular/common';
import {ContactRoutingModule} from './contact.routing.module';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {TooltipModule} from 'ngx-bootstrap';

@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    AngularSvgIconModule,
    TooltipModule.forRoot()
  ]
})

export class ContactModule {}
