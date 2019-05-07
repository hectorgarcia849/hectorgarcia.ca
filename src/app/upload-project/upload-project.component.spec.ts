import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadProjectComponent } from './upload-project.component';

describe('UploadProjectComponent', () => {
  let component: UploadProjectComponent;
  let fixture: ComponentFixture<UploadProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
