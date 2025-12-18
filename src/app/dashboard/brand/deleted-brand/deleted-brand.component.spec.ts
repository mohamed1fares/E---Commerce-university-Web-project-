import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedBrandComponent } from './deleted-brand.component';

describe('DeletedBrandComponent', () => {
  let component: DeletedBrandComponent;
  let fixture: ComponentFixture<DeletedBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletedBrandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletedBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
