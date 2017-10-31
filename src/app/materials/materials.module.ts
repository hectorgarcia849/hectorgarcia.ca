import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCardModule, MatChipsModule, MatGridListModule, MatIconModule, MatTabsModule,
  MatToolbarModule
} from '@angular/material';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports: [
    MatIconModule,
    MatTabsModule,
    MatGridListModule,
    MatCardModule,
    MatToolbarModule,
    MatChipsModule
  ]
})
export class MaterialsModule {
  constructor() {
  }
}
