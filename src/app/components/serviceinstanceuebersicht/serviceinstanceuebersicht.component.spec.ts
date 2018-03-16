import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceinstanceuebersichtComponent } from './serviceinstanceuebersicht.component';

describe('ServiceinstanceuebersichtComponent', () => {
  let component: ServiceinstanceuebersichtComponent;
  let fixture: ComponentFixture<ServiceinstanceuebersichtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceinstanceuebersichtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceinstanceuebersichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
