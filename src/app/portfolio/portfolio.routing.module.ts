
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PortfolioComponent} from './portfolio.component';


const portfolioRoutes: Routes = [{path: '', component: PortfolioComponent}];

@NgModule({
  imports: [
    RouterModule.forChild(portfolioRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: []
})


export class PortfolioRoutingModule {}
