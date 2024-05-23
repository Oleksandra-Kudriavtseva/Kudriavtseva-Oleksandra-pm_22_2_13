import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormService } from '../form.service';

@Component({
  selector: 'app-topmenu',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.css']
})
export class TopMenuComponent {
  isDropdownOpen = false;
  selectedForm: string | null = null;
  reactiveForm: FormGroup;

  constructor(private fb: FormBuilder, private formService: FormService) {
    this.reactiveForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectForm(formType: string): void {
    this.selectedForm = formType;
    this.isDropdownOpen = false;
  }

  closeModal(): void {
    this.selectedForm = null;
  }

  onSubmitTemplate(form: NgForm): void {
    if (form.valid) {
      this.formService.submitForm(form.value).subscribe((response: any) => {
        console.log('Form submitted successfully', response);
        this.closeModal();
      }, (error: any) => {
        console.error('Form submission error', error);
      });
    }
  }

  onSubmitReactive(): void {
    if (this.reactiveForm.valid) {
      this.formService.submitForm(this.reactiveForm.value).subscribe((response: any) => {
        console.log('Form submitted successfully', response);
        this.closeModal();
      }, (error: any) => {
        console.error('Form submission error', error);
      });
    }
  }
}
