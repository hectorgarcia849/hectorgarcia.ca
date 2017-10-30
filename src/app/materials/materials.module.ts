import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule, MatGridListModule, MatIconModule, MatTabsModule, MatToolbarModule} from '@angular/material';


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
    MatToolbarModule
  ]
})
export class MaterialsModule {
  constructor() {
  }
}
