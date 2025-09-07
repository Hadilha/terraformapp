import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheApp } from './the-app';

describe('TheApp', () => {
  let component: TheApp;
  let fixture: ComponentFixture<TheApp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TheApp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheApp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
