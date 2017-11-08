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
  articles = {};
  topicsSubscription: Subscription;
  articlesSubscription: Subscription;
  topics: string[] = [];

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private articlesService: ArticlesService) {
  }

  ngOnInit() {
    this.topicsSubscription = this.articlesService.topics$
      .subscribe((topics) => {
        this.topics = topics;
        this.activatedRoute.queryParams.subscribe((params: Params) => {
          const selectedTopic = this.matchQueryTopicAndTab(params['topic']);
          this.articlesService.getArticlesByTopicFromServerAndEmit(selectedTopic)
            .then((allRetreivedArticles) => {
              this.articles = allRetreivedArticles;
          });
        });
    });
    this.articlesSubscription = this.articlesService.articles$.subscribe((articles) => {
      this.articles = articles;
    });
  }

  ngOnDestroy() {
    this.topicsSubscription.unsubscribe();
    this.articlesSubscription.unsubscribe();
  }

  async updateQueryParams(index: number) {
    const updatedTopic = this.topics[index];
    const queryParams: Params = Object.assign({}, this.activatedRoute.snapshot.queryParams);
    queryParams['topic'] = updatedTopic;
    await this.router.navigate(['./articles'], {queryParams});
  }

  matchQueryTopicAndTab(topic: string) {
    let selectIndex;
    if (topic) {
      selectIndex = this.findTabIndexOfTopic(topic);
    } else {
      selectIndex = 0;
      this.updateQueryParams(selectIndex);
    }
    this.setSelectedTab(selectIndex);
    return this.topics[this.getSelectedTab()];
  }

  setSelectedTab (i: number) {
    this.selectedTab = i;
  }

  getSelectedTab(): number {
    return this.selectedTab;
  }

  getSelectedTopic(): string {
    return this.topics[this.selectedTab];
  }

  findTabIndexOfTopic(topic: string): number {
    const defaultIndex = 0;
    return topic ?
      this.topics.findIndex((tab: string) => tab === topic) : defaultIndex;
  }

  populateArticlesBySelectedTopic() {
    const selectedTopic = this.topics[this.selectedTab];
    if (!this.articles[selectedTopic]) {
      this.articlesService.getArticlesByTopicFromServerAndEmit(selectedTopic);
    }
  }

  capitalize(s: string) {
    return s.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
  }
}

