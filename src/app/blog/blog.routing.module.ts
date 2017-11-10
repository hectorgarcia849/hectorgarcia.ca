import {NgModule} from '@angular/core';
import {BlogComponent} from './blog.component';
import {RouterModule, Routes} from '@angular/router';


const blogRoutes: Routes = [
  {path: '', component: BlogComponent}
];

@NgModule({
  imports: [RouterModule.forChild(blogRoutes)],
  exports: [RouterModule],
  providers: []
})

export class BlogRoutingModule {}
