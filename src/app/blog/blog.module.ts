import {NgModule} from '@angular/core';
import {ArticleGridComponent} from './article-grid/article-grid.component';
import {BlogComponent} from './blog.component';
import {CommonModule} from '@angular/common';
import {BlogRoutingModule} from './blog.routing.module';
import {MaterialsModule} from '../materials/materials.module';
import {TabsModule} from 'ngx-bootstrap';
import {ArticleComponent} from "./article/article.component";

@NgModule({
  declarations: [
    ArticleGridComponent,
    BlogComponent,
    ArticleComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    MaterialsModule,
    TabsModule.forRoot()
  ],
})

export class BlogModule {}
