import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedCategoryComponent } from './deleted-category.component';

describe('DeletedCategoryComponent', () => {
  let component: DeletedCategoryComponent;
  let fixture: ComponentFixture<DeletedCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletedCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletedCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
