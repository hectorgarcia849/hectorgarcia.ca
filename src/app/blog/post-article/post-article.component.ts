import {Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatChipInputEvent} from '@angular/material';
import {Article} from '../../models/article.model';
import {FormControl, NgForm} from '@angular/forms';
import {ArticlesService} from '../../services/articles.service';
import {ENTER} from '@angular/cdk/keycodes';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Subscription} from 'rxjs/index';

const COMMA = 188;

@Component({
  selector: 'app-post-article',
  templateUrl: './post-article.component.html',
  styleUrls: ['./post-article.component.css']
})
export class PostArticleComponent implements OnInit, OnDestroy {

  title = '';
  body = '';
  topic = '';
  tags: string[] = [];
  separatorKeysCodes = [ENTER, COMMA];
  errorSubscription: Subscription;
  articleToUpdateSubscription: Subscription;
  updatingArticle: Article;
  errorMessage: string;
  mode = 'post';
  public modalRef: BsModalRef;
  @ViewChild('modal') modal: TemplateRef<any>;

  constructor(private articlesService: ArticlesService, private modalService: BsModalService) {
  }

  ngOnInit() {
    this.errorSubscription = this.articlesService.error$
      .subscribe(
        (message) => {
          this.errorMessage = message;
          this.modalRef = this.modalService.show(this.modal);
        });

    this.articleToUpdateSubscription = this.articlesService.articleToUpdate$
      .subscribe((article: Article) => {
        this.mode = 'update';
        this.updatingArticle = article;
        this.title = article.title;
        this.body = article.content.replace(/<br\s*[\/]?>/g, '\n');
        this.topic = article.topic;
        this.tags = article.tags;
      });
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
    this.articleToUpdateSubscription.unsubscribe();
  }

  onSubmitArticle(form: NgForm) {
    if (this.mode === 'post') {
      this.onPostArticle();
    } else if (this.mode === 'update') {
      this.onUpdateArticle();
    }
    this.tags = [];
    form.reset();
  }

  onPostArticle() {
    const newArticle = new Article(this.title, this.body, this.topic, this.title.substring(0, 140), this.tags);
    this.articlesService.postArticle(newArticle);
  }

  onUpdateArticle() {
    this.updatingArticle.title = this.title;
    this.updatingArticle.topic = this.topic;
    this.updatingArticle.content = this.body.replace(/\n/g, '<br />');

    this.updatingArticle.tags = this.tags;
    this.articlesService.updateArticleOnServer(this.updatingArticle);
    this.mode = 'post';

  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
}
