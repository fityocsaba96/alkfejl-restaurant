import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrderOverviewComponent } from './user-order-overview.component';

describe('UserOrderOverviewComponent', () => {
  let component: UserOrderOverviewComponent;
  let fixture: ComponentFixture<UserOrderOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserOrderOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOrderOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
