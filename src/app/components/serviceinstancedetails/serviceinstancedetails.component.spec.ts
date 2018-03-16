import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceinstancedetailsComponent } from './serviceinstancedetails.component';

describe('ServiceinstancedetailsComponent', () => {
  let component: ServiceinstancedetailsComponent;
  let fixture: ComponentFixture<ServiceinstancedetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceinstancedetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceinstancedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
