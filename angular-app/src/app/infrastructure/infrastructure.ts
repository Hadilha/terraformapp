import { Component } from '@angular/core';
import { TerraformDiagram } from '../terraform-diagram/terraform-diagram';
@Component({
  selector: 'app-infrastructure',
  imports: [TerraformDiagram],
  templateUrl: './infrastructure.html',
  styleUrl: './infrastructure.css'
})
export class Infrastructure {

}
