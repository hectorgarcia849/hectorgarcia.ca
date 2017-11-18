import {Component, OnDestroy, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ArticlesService} from '../../services/articles.service';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/concat';
import {Article} from '../../models/article.model';

@Component({
  selector: 'app-article-grid',
  templateUrl: './article-grid.component.html',
  styleUrls: ['./article-grid.component.css']
})
export class ArticleGridComponent implements OnInit, OnDestroy {
  selectedTabIndex;
  articles: Article[] = [];
  articlesSubscription: Subscription;
  paramsSubscription: Subscription;
  topicsSubscription: Subscription;
  topics: {topic: string, isLoaded: boolean} [] = [];
  articlesBySelectedTopic: Article[] = [];

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private articlesService: ArticlesService) {
  }

  ngOnInit() {

    this.topicsSubscription = this.articlesService.topics$
      .subscribe(
        (topics) => {
          this.selectedTabIndex = 0;
          this.topics = topics;
          return this.activatedRoute.queryParams;
      });

    this.paramsSubscription = this.activatedRoute.queryParams
      .subscribe(
        (params: Params) => {
          this.matchQueryTopicAndTab(params['topic']);
          return this.articlesService.articles$;
      });

    this.articlesSubscription = this.articlesService.articles$.subscribe(
      (articles: Article[]) => {
        this.articles = articles;
        this.articles.sort((a: Article, b: Article) => parseInt(a.postDate, 10) <= parseInt(b.postDate, 10) ? 1 : -1);
        this.getArticlesBySelectedTopic();
      });
  }

  ngOnDestroy() {
    this.articlesSubscription.unsubscribe();
    this.paramsSubscription.unsubscribe();
    this.articlesSubscription.unsubscribe();
  }

  matchQueryTopicAndTab(topic: string) {
    let selectIndex;
    if (topic && this.topics.length > 0) {
      selectIndex = this.findTabIndexOfTopic(topic);
    } else {
      selectIndex = 0;
    }
    this.setSelectedTab(selectIndex);
  }

  updateQueryParams(index: number): Promise<any> {
    if (index > -1) {
      const updatedTopic = this.topics[index].topic;
      const queryParams: Params = Object.assign({}, this.activatedRoute.snapshot.queryParams);
      queryParams['topic'] = updatedTopic;
      return this.router.navigate(['./articles'], {queryParams});
    } else {
      return this.router.navigate(['./articles']);
    }
  }

  setSelectedTab (i: number) {
    this.selectedTabIndex = i;
  }

  emitSelectedTopic() {
    this.updateQueryParams(this.selectedTabIndex).catch((e) => { console.log('error', e); });
    this.articlesService.emitSelectedTopic(this.getSelectedTopic());
  }

  getSelectedTopic(): string {
    return this.topics[this.selectedTabIndex].topic;
  }

  findTabIndexOfTopic(topic: string): number {
    return this.topics.findIndex((tab: {topic: string, isLoaded: boolean}) => tab.topic === topic);
  }

  isArticles(): boolean {
    return this.articles.length > 0;
  }

  getArticlesBySelectedTopic() {
    this.articlesBySelectedTopic = [];
    const selectedTopic = this.getSelectedTopic();
    if (this.articles.length > 0) {
      for (const article of this.articles) {
        if (article.topic === selectedTopic) {
          this.articlesBySelectedTopic.push(article);
        }
      }
    }
  }

}
