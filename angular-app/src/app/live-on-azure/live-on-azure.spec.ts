import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveOnAzure } from './live-on-azure';

describe('LiveOnAzure', () => {
  let component: LiveOnAzure;
  let fixture: ComponentFixture<LiveOnAzure>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveOnAzure]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveOnAzure);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
