import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyRowFormComponent } from './modify-row-form.component';

describe('ModifyRowFormComponent', () => {
  let component: ModifyRowFormComponent;
  let fixture: ComponentFixture<ModifyRowFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyRowFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyRowFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
