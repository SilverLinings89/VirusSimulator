import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WorldViewComponent } from './world-view.component';

describe('WorldViewComponent', () => {
  let component: WorldViewComponent;
  let fixture: ComponentFixture<WorldViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WorldViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
