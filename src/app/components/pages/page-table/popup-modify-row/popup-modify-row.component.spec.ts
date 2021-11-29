import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupModifyRowComponent } from './popup-modify-row.component';

describe('PopupModifyRowComponent', () => {
  let component: PopupModifyRowComponent;
  let fixture: ComponentFixture<PopupModifyRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupModifyRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupModifyRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
