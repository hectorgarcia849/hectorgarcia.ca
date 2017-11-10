import {Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatChipInputEvent} from '@angular/material';
import {Article} from '../../models/article.model';
import {FormControl, NgForm} from '@angular/forms';
import {ArticlesService} from '../../services/articles.service';
import {ENTER} from '@angular/cdk/keycodes';
import {Subscription} from 'rxjs/Subscription';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

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
  tabs: string[];
  topicsSubscription: Subscription;
  public modalRef: BsModalRef;
  errorSubscription: Subscription;
  errorMessage: string;
  myControl: FormControl = new FormControl();
  @ViewChild('modal') modal: TemplateRef<any>;

  constructor(private articlesService: ArticlesService, private modalService: BsModalService) {
  }

  ngOnInit() {
    this.topicsSubscription = this.articlesService.topics$
      .subscribe((topics) => this.tabs = topics);

    this.errorSubscription = this.articlesService.error$
      .subscribe(
        (message) => {
          this.errorMessage = message;
          this.modalRef = this.modalService.show(this.modal);
        });
  }

  ngOnDestroy() {
    this.topicsSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
  }

  onPostArticle(form: NgForm) {
    const newArticle = new Article(this.title, this.body, this.topic, this.title.substring(0, 140), this.tags);
    this.articlesService.postArticle(newArticle);
    this.tags = [];
    form.reset();
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
