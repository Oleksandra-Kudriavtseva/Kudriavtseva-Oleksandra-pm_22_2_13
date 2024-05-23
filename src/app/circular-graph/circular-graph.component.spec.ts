import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircularGraphComponent } from './circular-graph.component';

describe('CircularGraphComponent', () => {
  let component: CircularGraphComponent;
  let fixture: ComponentFixture<CircularGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CircularGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CircularGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
