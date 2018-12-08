import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Article} from '../models/article.model';
import 'rxjs/add/operator/toPromise';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';
import {ReplaySubject} from 'rxjs/ReplaySubject';

const NOT_FOUND = -1;

@Injectable()

export class ArticlesService {

  private articles: Article[] = [];
  private articlesSubject = new ReplaySubject<any>(1);
  public  articles$ = this.articlesSubject.asObservable();
  private articleToUpdate = new Subject<Article>();
  public  articleToUpdate$ = this.articleToUpdate.asObservable();
  private topics = [];
  private topicsSubject = new ReplaySubject<{topic: string, isLoaded: boolean}[]>(1);
  public  topics$ = this.topicsSubject.asObservable();
  private selectedTopicSubject = new Subject<string>();
  private selectedTopic$ = this.selectedTopicSubject.asObservable();
  private selectedTopicSubscription: Subscription;
  // private url = 'https://hectorgarcia.herokuapp.com';
  private url = 'http://localhost:8100';
  private errorSubject = new Subject<string>();
  public  error$ = this.errorSubject.asObservable();

  constructor (private http: HttpClient) {

    // on start-up:
    // 1) gets all topics from server, if no topics exists, return an empty array.
    // 2) onSelectedTopic emitted, tries to get Articles for that topic
    this.getArticleTopicsFromServer()
      .then(
        (topics) => {
          this.pushTopics(topics, false);
          this.emitTopics();
        });

    this.selectedTopicSubscription = this.selectedTopic$
      .subscribe(async (selectedTopic) => {
        await this.getArticlesByTopicFromServer(selectedTopic);
        this.emitArticles();
      });
  }

  async getArticleTopicsFromServer() {
    return await this.http.get(`${this.url}/services/articles/topics`).toPromise()
      .then((topics: string[]) => {
        return topics;
      });
  }

  postArticle(article: Article) {

    /* Sends http post request to server, receives article back if it is successfully added to DB.
      The returned article is used to update this.articles object and emits an update to subscribers. */

    const body = JSON.stringify(article);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const token = JSON.parse(sessionStorage.getItem('token'));

    this.http.post(`${this.url}/services/articles?token=${token}`, body, {headers})
      .subscribe(
        (response: any) => {

          const topic = response.article.topic;
          const articleHasNewTopic = this.topics.indexOf(topic) === NOT_FOUND;

          if (articleHasNewTopic) {
            this.pushTopics([topic], true);
            this.emitTopics();
          }
          const postedArticle = new Article(
            response.article.title,
            response.article.content,
            response.article.topic,
            response.article.excerpt,
            response.article.tags,
            response.article.authoer,
            response.article.postDate,
            response.article._id
          );

          this.articles.push(postedArticle);
          this.emitArticles();
        },
        (error) => {
          this.emitErrorMessage(error);
        }
      );
  }

  async getArticlesByTopicFromServer(topic: string) {
    //  Only gets articles by topic if an element with the topic property matches param passed.
    const topicToLoad = this.topics.find((val, index, arr) => val.topic === topic);
    if (!topicToLoad.isLoaded) {
      await this.http.get(`${this.url}/services/articles/by/topic?topic=${topic}`)
        .toPromise()
        .then(
          (articles: any[]) => {
            if (articles.length > 0) {
              articles.forEach((article: Article) => {
                this.articles.push(
                  new Article(
                    article.title,
                    article.content,
                    article.topic,
                    article.excerpt,
                    article.tags,
                    article.author,
                    article.postDate,
                    article._id)
                  );
              });
            }
            const topicIndex = this.topics.findIndex((val, i, a) => val.topic === topic);
            this.topics[topicIndex].isLoaded = true;
          }
        );
    }
    return this.articles;
  }

  deleteArticleByID(_id: string) {
    const token = JSON.parse(sessionStorage.getItem('token'));
    this.http.delete(`${this.url}/services/articles/by/article?_id=${_id}&token=${token}`).subscribe((response: any) => {
      this.removeArticle(_id, (topic) => {
        const topicHasNoMoreArticles = this.articleCountForTopic(topic) === 0;
        if (topicHasNoMoreArticles) {
          this.removeTopic(topic);
          const nextTopic = 0;
          this.emitTopics();
          this.emitSelectedTopic(this.topics[nextTopic].topic);
        } else {
          this.emitArticles();
        }
      });
    });
  }

  updateArticleOnServer(updatedArticle: Article) {
    const token = JSON.parse(sessionStorage.getItem('token'));
    this.http.patch(`${this.url}/services/articles/by/article?_id=${updatedArticle._id}&token=${token}`, updatedArticle)
      .subscribe((response: any) => {
        const topic = response.article.topic;
        const article = new Article(
          response.article.title,
          response.article.content,
          response.article.topic,
          response.article.excerpt,
          response.article.tags,
          response.article.author,
          response.article.postDate,
          response.article._id
          );
        this.updateArticle(article, (topicChanged, prevTopic) => {
          const prevTopicHasNoMoreArticles = this.articleCountForTopic(prevTopic) === 0;
          if (topicChanged && prevTopicHasNoMoreArticles) {
            // const nextTopic = 0;
            // this.emitSelectedTopic(this.topics[nextTopic]);
            this.removeTopic(topic);
            this.emitTopics();
          } else {
            this.emitArticles();
          }
        });
      });
  }

  private removeArticle(_id: string, callback: (topic: string) => void) {
    const articleIndex: number = this.getArticleIndex(_id);
    const topic = this.articles[articleIndex].topic;
    this.articles.splice(articleIndex, 1);
    callback(topic);
  }

  private removeTopic(topic: string) {
    this.topics.splice(this.topics.findIndex((val, i, a) => val.topic === topic), 1);
  }

  private updateArticle(updatedArticle: Article, callback: (topicChanged: boolean, prevTopic: string) => void) {
    const articleIndex: number = this.getArticleIndex(updatedArticle._id);
    const topic = this.articles[articleIndex].topic;
    this.articles[articleIndex] = updatedArticle;
    callback(topic !== updatedArticle.topic, topic);
  }

  private emitTopics() {
    this.topicsSubject.next(this.topics.slice());
  }

  private pushTopics(topics: string[], isLoaded: boolean) {
    topics.forEach((topic) => {
      if (this.topics.indexOf(topic) === NOT_FOUND) {
        return this.topics.push({topic, isLoaded});
      }
    });
  }

  private emitErrorMessage(error) {
    if (error.status === 400) {
      this.errorSubject.next('Unable to post article at this time.  Please make sure all fields are correctly filled.');
    } else if (error.status === 404) {
      this.errorSubject.next('Unable to connect to server.  Check your internet connection and try again.');
    } else {
      this.errorSubject.next(`Status: ${error.status}  Message: ${error.errors.message}.`);
    }
  }

  emitArticles() {
    this.articlesSubject.next(this.articles.slice());
  }

  emitSelectedTopic(topic: string) {
    this.selectedTopicSubject.next(topic);
  }

  emitArticleToUpdate(article: Article) {
    this.articleToUpdate.next(article);
  }

  getArticleIndex(_id: string): number {
    return this.articles.findIndex((val, i, a) => val._id === _id);
  }

  articleCountForTopic(topic: string) {
    let count = 0;
    this.articles.forEach((article) => {
      if (article.topic === topic) {
        count++;
      }
    });
    return count;
  }

}
