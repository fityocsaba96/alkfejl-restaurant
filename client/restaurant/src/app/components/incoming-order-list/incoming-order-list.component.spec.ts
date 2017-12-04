import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingOrderListComponent } from './incoming-order-list.component';

describe('IncomingOrderListComponent', () => {
  let component: IncomingOrderListComponent;
  let fixture: ComponentFixture<IncomingOrderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomingOrderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomingOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
