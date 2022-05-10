import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PresetListComponent } from './preset-list.component';

describe('PresetListComponent', () => {
  let component: PresetListComponent;
  let fixture: ComponentFixture<PresetListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PresetListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
