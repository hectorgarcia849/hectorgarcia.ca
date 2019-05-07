import {Injectable} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {HttpHeaders} from '@angular/common/http';

@Injectable()

export class FileUploaderService {
  token = JSON.parse(sessionStorage.getItem('token'));
  private url = `/services/uploadproject/upload?token=${this.token}`;
  uploader: FileUploader = new FileUploader({url: this.url, disableMultipart: true, itemAlias: 'project'});

  constructor() {
  }


}
