/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ActionpageComponent } from './actionpage.component';

describe('ActionpageComponent', () => {
  let component: ActionpageComponent;
  let fixture: ComponentFixture<ActionpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
