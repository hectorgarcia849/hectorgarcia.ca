import {NgModule} from '@angular/core';
import {PortfolioComponent} from './portfolio.component';
import {PortfolioGridComponent} from './portfolio-grid/portfolio-grid.component';
import {CommonModule} from '@angular/common';
import {MaterialsModule} from '../materials/materials.module';
import {PortfolioRoutingModule} from './portfolio.routing.module';

@NgModule({
  declarations: [
    PortfolioComponent,
    PortfolioGridComponent
  ],
  imports: [
    CommonModule,
    PortfolioRoutingModule,
    MaterialsModule
  ],
  exports: [PortfolioComponent]
})

export class PortfolioModule {}
