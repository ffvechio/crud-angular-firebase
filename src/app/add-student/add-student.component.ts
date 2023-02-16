import { Component, OnInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent implements OnInit {
  public studentForm: FormGroup;
  constructor(
    public crudApi: CrudService,
    public fb: FormBuilder,
    public toastr: ToastrService
  ) {}
  ngOnInit() {
    this.crudApi.GetStudentsList();
    this.studenForm();
  }
  studenForm() {
    this.studentForm = this.fb.group({
      firstName: ['nome default', [Validators.required, Validators.minLength(2)]],
      lastName: [''],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
        ],
      ],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }
  get firstName() {
    return this.studentForm.get('firstName');
  }
  get lastName() {
    return this.studentForm.get('lastName');
  }
  get email() {
    return this.studentForm.get('email');
  }
  get mobileNumber() {
    return this.studentForm.get('mobileNumber');
  }
  ResetForm() {
    this.studentForm.reset();
  }
  submitStudentData() {
    this.crudApi.AddStudent(this.studentForm.value);
    this.toastr.success(
      this.studentForm.controls['firstName'].value + ' successfully added!'
    );
    this.ResetForm();
  }
}