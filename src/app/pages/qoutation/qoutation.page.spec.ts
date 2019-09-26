import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QoutationPage } from './qoutation.page';

describe('QoutationPage', () => {
  let component: QoutationPage;
  let fixture: ComponentFixture<QoutationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QoutationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QoutationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
