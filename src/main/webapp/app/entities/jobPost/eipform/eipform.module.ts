import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EIP_ROUTE } from './eipform.route';
import { RouterModule } from '@angular/router';
import { EipformComponent } from 'app/entities/jobPost/eipform/eipform.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [EipformComponent],
  imports: [CommonModule, RouterModule.forChild([EIP_ROUTE]), FormsModule, FontAwesomeModule, NgbDatepickerModule, ReactiveFormsModule]
})
export class EipformModule {}
