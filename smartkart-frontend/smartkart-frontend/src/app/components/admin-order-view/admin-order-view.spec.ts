import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderView } from './admin-order-view';

describe('AdminOrderView', () => {
  let component: AdminOrderView;
  let fixture: ComponentFixture<AdminOrderView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminOrderView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminOrderView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
