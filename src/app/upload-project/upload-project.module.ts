import {NgModule} from '@angular/core';
import {ArticleGridComponent} from './article-grid/article-grid.component';
import {UploadProjectComponent} from './upload-project.component';
import {CommonModule} from '@angular/common';
import {UploadProjectRoutingModule} from './upload-project.routing.module';
import {MaterialsModule} from '../materials/materials.module';
import {ArticleComponent} from './article/article.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PostArticleComponent} from './post-project/post-project.component';
import {FileUploadModule} from 'ng2-file-upload';


@NgModule({
  declarations: [
    ArticleGridComponent,
    UploadProjectComponent,
    ArticleComponent,
    PostArticleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UploadProjectRoutingModule,
    MaterialsModule,
    FileUploadModule
  ],
})

export class UploadProjectModule {}
