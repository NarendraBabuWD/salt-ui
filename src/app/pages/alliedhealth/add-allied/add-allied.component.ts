import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'ngx-add-allied',
  templateUrl: './add-allied.component.html',
  styleUrls: ['./add-allied.component.scss']
})
export class AddAlliedComponent implements OnInit {

   
  form: FormGroup;

  titles = ['Mr', 'Ms', 'Mrs', 'Dr', 'Prof']
  catagories = ['Non Medical User', 'Aboriginal Health Worker', 'Exercise Physiologist', 'Podiatrist', 'Audiologist', 'Mental Health Worker', 'Psychologist', 'Chiropractor', 'Occupational Therapist', 'Speech Pathologist', 'Diabetes Educator', 'Osteopath', 'Dietitian', 'Physiotherapist', 'Dermatology', 'General Medicine', 'Dermatology', 'Gynaecology']

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.required]],
      address: ["", Validators.required],
      pincode: ["", Validators.required],
      catagory: ["", Validators.required]
    });
  }

  submit() {
    console.log(this.form.getRawValue())
  }

}

 