import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ArticlesService} from '../../services/articles.service';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-article-grid',
  templateUrl: './article-grid.component.html',
  styleUrls: ['./article-grid.component.css']
})
export class ArticleGridComponent implements OnInit, OnDestroy {
  selectedTab = 0;
  articles = [];
  topicsSubscription: Subscription;
  articlesSubscription: Subscription;
  queryParamsSubscription: Subscription;
  topics: string[] = [];
  articlesBySelectedTopic = [];

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private articlesService: ArticlesService) {
  }

  ngOnInit() {

    this.topicsSubscription = this.articlesService.topics$
      .subscribe((topics) => {
        this.topics = topics;
    });

    this.articlesSubscription = this.articlesService.articles$
      .subscribe((articles) => {
        this.articles = articles;
        this.getArticlesBySelectedTopic();
      });

    this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe(async (params: Params) => {
      await this.matchQueryTopicAndTab(params['topic']);
    });

  }

  ngOnDestroy() {
    this.topicsSubscription.unsubscribe();
    this.articlesSubscription.unsubscribe();
    this.queryParamsSubscription.unsubscribe();
  }

  matchQueryTopicAndTab(topic: string) {
    let selectIndex;
    if (topic && this.topics.length > 0) {
      selectIndex = this.findTabIndexOfTopic(topic);
    } else {
      selectIndex = 0;
    }
    this.setSelectedTab(selectIndex);
    return this.updateQueryParams(selectIndex);
  }

  updateQueryParams(index: number): Promise<any> {
    if (index > -1) {
      const updatedTopic = this.topics[index];
      const queryParams: Params = Object.assign({}, this.activatedRoute.snapshot.queryParams);
      queryParams['topic'] = updatedTopic;
      return this.router.navigate(['./articles'], {queryParams});
    } else {
      // couldn't locate topic in query params.  Show an error message.
      return this.router.navigate(['./articles']);
    }
  }

  setSelectedTab (i: number) {
    this.selectedTab = i;
  }

  emitSelectedTopic() {
    this.articlesService.emitSelectedTopic(this.getSelectedTopic());
  }

  getSelectedTopic(): string {
    return this.topics[this.selectedTab];
  }

  findTabIndexOfTopic(topic: string): number {
    const defaultIndex = 0;
    return topic ?
      this.topics.findIndex((tab: string) => tab === topic) : defaultIndex;
  }

  isArticles(): boolean {
    return this.articles ? true : false;
  }

  getArticlesBySelectedTopic() {
    this.articlesBySelectedTopic = [];
    if (this.articles.length > 0) {
      const articlesByTopic = this.articles.find(
        (value: { topic: string, articles: any[] }) => value.topic === this.getSelectedTopic());
      if (articlesByTopic) {
        this.articlesBySelectedTopic = articlesByTopic.articles;
      }
    }
  }

}
