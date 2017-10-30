import {Component, OnInit, TemplateRef} from '@angular/core';
import {Card} from '../../models/card.model';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {cardData} from './carddata';

@Component({
  selector: 'app-portfolio-grid',
  templateUrl: './portfolio-grid.component.html',
  styleUrls: ['./portfolio-grid.component.css'],
  animations: [

  ]
})
export class PortfolioGridComponent implements OnInit {
  cards: Card[] = cardData;
  state = 'start';
  public modalRef: BsModalRef;
  imagePath = 'http://lorempixel.com/400/300/technics';

  constructor(private modalService: BsModalService) {
  }

  ngOnInit() {
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
