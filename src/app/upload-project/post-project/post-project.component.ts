import {Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatChipInputEvent} from '@angular/material';
import {Article} from '../../models/article.model';
import {FormControl, NgForm} from '@angular/forms';
import {ArticlesService} from '../../services/articles.service';
import {ENTER} from '@angular/cdk/keycodes';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Subscription} from 'rxjs/Rx';
import {FileUploader} from 'ng2-file-upload';
import {Project} from '../../models/project.model';
import {FileUploaderService} from '../../services/file-uploader.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const COMMA = 188;

@Component({
  selector: 'app-post-article',
  templateUrl: './post-project.component.html',
  styleUrls: ['./post-project.component.css']})

export class PostArticleComponent implements OnInit, OnDestroy {
  public hasBaseDropZoneOver = false;
  project: Project = new Project();
  separatorKeysCodes = [ENTER, COMMA];
  errorSubscription: Subscription;
  articleToUpdateSubscription: Subscription;
  updatingArticle: Article;
  errorMessage: string;
  mode = 'post';
  uploader: FileUploader;
  files: File[] = [];
  links: string[];

  public modalRef: BsModalRef;
  @ViewChild('modal') modal: TemplateRef<any>;

  constructor(private articlesService: ArticlesService,
              private modalService: BsModalService,
              private fileUploaderService: FileUploaderService, private http: HttpClient) {

    this.uploader = this.fileUploaderService.uploader;

    const token = JSON.parse(sessionStorage.getItem('token'));

    this.http.get(`/services/uploadproject/files?token=${token}`)
      .subscribe((response: any) => {
        this.links = response.links;
        console.log('returned', this.links);
      });

  }

  ngOnInit() {
    this.errorSubscription = this.articlesService.error$
      .subscribe(
        (message) => {
          this.errorMessage = message;
          this.modalRef = this.modalService.show(this.modal);
        });

    // this.articleToUpdateSubscription = this.articlesService.articleToUpdate$
    //   .subscribe((article: Article) => {
    //     this.mode = 'update';
    //     this.updatingArticle = article;
    //     this.title = article.title;
    //     this.preview = article.content.replace(/<br\s*[\/]?>/g, '\n');
    //     this.topic = article.topic;
    //     this.tags = article.tags;
    //   });
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }

  onSubmitProject(form: NgForm) {
    console.log('sending post request');
    const token = JSON.parse(sessionStorage.getItem('token'));
    const fd = new FormData();
    this.files.map(f => fd.append('file', f, f.name));
    fd.append('project', JSON.stringify(this.project));

    this.http.post(`/services/uploadproject/upload?token=${token}`, fd)
      .subscribe((response: any) => console.log('returned', response));

    // if (this.mode === 'post') {
    //   this.onPostArticle();
    // } else if (this.mode === 'update') {
    //   this.onUpdateArticle();
    // }
    // this.tags = [];
    // form.reset();
  }

  filesSelected(fileInput) {
    console.log('input change event triggered, ', fileInput);


    for (let i = 0; i < fileInput.files.length; i++) {
      this.files.push(fileInput.files[i]);
    }

    console.log(this.files);

  }

  onPostProject() {
    // In projectService -> upload files (contains cover.png, index.html), getURL back, then upload Project into mongodb
    console.log('sent to upload');
    // const projectURL = '';
    // const newProject = new Project(this.title, this.topic, this.tags, this.preview, projectURL);
    // console.log(newProject);
    // this.articlesService.postArticle(newProject);
  }

  // onUpdateArticle() {
  //   this.updatingArticle.title = this.title;
  //   this.updatingArticle.topic = this.topic;
  //   this.updatingArticle.content = this.preview.replace(/\n/g, '<br />');
  //
  //   this.updatingArticle.tags = this.tags;
  //   this.articlesService.updateArticleOnServer(this.updatingArticle);
  //   this.mode = 'post';
  //
  // }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.project.tags.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
  }

  remove(tag: string): void {
    const index = this.project.tags.indexOf(tag);
    if (index >= 0) {
      this.project.tags.splice(index, 1);
    }
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

}
