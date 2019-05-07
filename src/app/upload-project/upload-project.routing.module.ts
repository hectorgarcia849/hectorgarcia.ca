import {NgModule} from '@angular/core';
import {UploadProjectComponent} from './upload-project.component';
import {RouterModule, Routes} from '@angular/router';


const uploadProjectRoutes: Routes = [
  {path: '', component: UploadProjectComponent}
];

@NgModule({
  imports: [RouterModule.forChild(uploadProjectRoutes)],
  exports: [RouterModule],
  providers: []
})

export class UploadProjectRoutingModule {}
