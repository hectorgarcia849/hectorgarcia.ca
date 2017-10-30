import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhymeComponent } from './whyme.component';

describe('WhymeComponent', () => {
  let component: WhymeComponent;
  let fixture: ComponentFixture<WhymeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhymeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhymeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
