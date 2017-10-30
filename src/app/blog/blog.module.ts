import {NgModule} from '@angular/core';
import {ArticleGridComponent} from './article-grid/article-grid.component';
import {BlogComponent} from './blog.component';
import {CommonModule} from '@angular/common';
import {BlogRoutingModule} from './blog.routing.module';
import {MaterialsModule} from '../materials/materials.module';

@NgModule({
  declarations: [
    ArticleGridComponent,
    BlogComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    MaterialsModule
  ],
})

export class BlogModule {}
