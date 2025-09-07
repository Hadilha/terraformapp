import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowItIsBuilt } from './how-it-is-built';

describe('HowItIsBuilt', () => {
  let component: HowItIsBuilt;
  let fixture: ComponentFixture<HowItIsBuilt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HowItIsBuilt]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HowItIsBuilt);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
