import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageConstructionComponent } from './manage-construction.component';

describe('ManageConstructionComponent', () => {
  let component: ManageConstructionComponent;
  let fixture: ComponentFixture<ManageConstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageConstructionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageConstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
