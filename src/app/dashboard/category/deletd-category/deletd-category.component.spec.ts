import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletdCategoryComponent } from './deletd-category.component';

describe('DeletdCategoryComponent', () => {
  let component: DeletdCategoryComponent;
  let fixture: ComponentFixture<DeletdCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletdCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletdCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
