import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessibleFormsModalComponent } from './accessible-forms-modal.component';

describe('AccessibleFormsModalComponent', () => {
  let component: AccessibleFormsModalComponent;
  let fixture: ComponentFixture<AccessibleFormsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccessibleFormsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessibleFormsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
