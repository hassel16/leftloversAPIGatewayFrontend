import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceuebersichtComponent } from './serviceuebersicht.component';

describe('ServiceuebersichtComponent', () => {
  let component: ServiceuebersichtComponent;
  let fixture: ComponentFixture<ServiceuebersichtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceuebersichtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceuebersichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
