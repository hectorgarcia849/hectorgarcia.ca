import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import * as moment from 'moment';
import {Article} from '../../models/article.model';
import {AuthenticationService} from '../../services/authentication.service';
import {Subscription} from 'rxjs/Subscription';
import {ArticlesService} from '../../services/articles.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  isLoggedInSubscription: Subscription;
  @Input() article: Article;
  constructor(private authService: AuthenticationService, private articleService: ArticlesService) { }

  ngOnInit() {
    this.isLoggedInSubscription = this.authService.isLoggedIn$
      .subscribe((state: boolean) => {
        this.isLoggedIn = state;
      });
  }

  ngOnDestroy() {
    this.isLoggedInSubscription.unsubscribe();
  }

  displayDate(date: string) {
    return moment(date).format('MMMM Do YYYY, h:mm a');
  }

  onDelete() {
    this.articleService.deleteArticleByID(this.article._id);
  }

  onUpdate() {
    this.articleService.emitArticleToUpdate(this.article);
  }

}
