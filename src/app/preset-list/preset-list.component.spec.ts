import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresetListComponent } from './preset-list.component';

describe('PresetListComponent', () => {
  let component: PresetListComponent;
  let fixture: ComponentFixture<PresetListComponent>;

  beforeEach(async(() => {
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
