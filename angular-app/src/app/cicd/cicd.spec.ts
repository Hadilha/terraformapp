import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cicd } from './cicd';

describe('Cicd', () => {
  let component: Cicd;
  let fixture: ComponentFixture<Cicd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cicd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cicd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
