import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainOperationMapComponent } from './train-operation-map.component';

describe('TrainOperationMapComponent', () => {
  let component: TrainOperationMapComponent;
  let fixture: ComponentFixture<TrainOperationMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainOperationMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainOperationMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
