import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerraformDiagram } from './terraform-diagram';

describe('TerraformDiagram', () => {
  let component: TerraformDiagram;
  let fixture: ComponentFixture<TerraformDiagram>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerraformDiagram]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TerraformDiagram);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
