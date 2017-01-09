/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GetingstartedComponent } from './getingstarted.component';

describe('GetingstartedComponent', () => {
  let component: GetingstartedComponent;
  let fixture: ComponentFixture<GetingstartedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetingstartedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetingstartedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
