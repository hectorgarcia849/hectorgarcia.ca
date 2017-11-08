
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Article} from '../models/article.model';
import 'rxjs/add/operator/toPromise';
import {Subject} from 'rxjs/Subject';

@Injectable()

export class ArticlesService {
  private articles = {};
  private articlesSubject = new Subject<any>();
  public articles$ = this.articlesSubject.asObservable();
  private topics = [];
  private topicsSubject = new Subject<string[]>();
  public topics$ = this.topicsSubject.asObservable();
  private url = 'http://localhost:8100';
  private errorSubject = new Subject<string>();
  public error$ = this.errorSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  async getArticleTopicsFromServerAndEmit() {
    this.topics = await this.http.get(`${this.url}/services/articles/topics`).toPromise()
      .then((returnedTopics: string[]) => {
        this.parseForNewTopicsAndAddToArticlesIndex();
        this.topicsSubject.next(returnedTopics);
        return returnedTopics;
      });
    console.log(this.topics);
    return this.topics;
  }

  postArticle(article: Article) {
    /* Sends http post request to server, receives article back if it is successfully added to DB.
      The returned article is used to update this.articles object and emits an update to subscribers. */
    const body = JSON.stringify(article);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const token = JSON.parse(sessionStorage.getItem('token'));

    this.http.post(`${this.url}/services/articles?token=${token}`, body, {headers})
      .subscribe(
        (postedArticle: any) => {
          const notFound = -1;
          const articleHasNewTopic = this.topics.indexOf(postedArticle.topic) === notFound;
          if (articleHasNewTopic) {
            this.pushTopicAndEmitUpdate(postedArticle.topic);
          }
          this.articles[postedArticle.topic] = postedArticle;
          this.articlesSubject.next(this.articles);
        },
        (error) => {
          this.emitErrorMessage(error);
        }
      );
  }

  private parseForNewTopicsAndAddToArticlesIndex() {
    this.topics.forEach((topic) => {
      if (!this.articles[topic]) {
        this.articles[topic] = [];
      }
    });
  }

  async getArticlesByTopicFromServerAndEmit(topic: string) {
    //  Only gets articles by topic if topic key is an empty array.  Therefore, topics must be updated!
    if (!this.articles[topic]) {
      this.articles[topic] = await this.http.get(`${this.url}/services/articles/by/topic?topic=${topic}`)
        .subscribe((articlesByTopic: any[]) => {
          console.log('http request');
          console.log(articlesByTopic);
          this.articles[topic] = articlesByTopic;
          this.articlesSubject.next(this.articles);
        });
    }
    console.log(this.articles);
    return this.articles;
  }

  emitErrorMessage(status: number) {
    if (status === 400) {
      this.errorSubject.next('Unable to post article at this time.  Please make sure all fields are correctly filled.');
    } else if (status === 404) {
      this.errorSubject.next('Unable to connect to server.  Try connecting to posting at a later time.');
    } else {
      this.errorSubject.next('An unidentified error has occurred.  Please contact the administrator.');
    }
  }

  pushTopicAndEmitUpdate(topic: string) {
    this.topics.push(topic);
    this.topicsSubject.next(this.topics);
  }
}
