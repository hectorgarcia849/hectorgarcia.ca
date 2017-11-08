import {NgModule} from '@angular/core';
import {ArticleGridComponent} from './article-grid/article-grid.component';
import {BlogComponent} from './blog.component';
import {CommonModule} from '@angular/common';
import {BlogRoutingModule} from './blog.routing.module';
import {MaterialsModule} from '../materials/materials.module';
import {ArticleComponent} from './article/article.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PostArticleComponent} from './post-article/post-article.component';


@NgModule({
  declarations: [
    ArticleGridComponent,
    BlogComponent,
    ArticleComponent,
    PostArticleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BlogRoutingModule,
    MaterialsModule
  ],
})

export class BlogModule {}
