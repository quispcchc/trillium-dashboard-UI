import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpactBlueprintComponent } from './impact-blueprint.component';

describe('ImpactBlueprintComponent', () => {
  let component: ImpactBlueprintComponent;
  let fixture: ComponentFixture<ImpactBlueprintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImpactBlueprintComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImpactBlueprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
