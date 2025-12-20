import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontCartComponent } from './front-cart.component';

describe('FrontCartComponent', () => {
  let component: FrontCartComponent;
  let fixture: ComponentFixture<FrontCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontCartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
