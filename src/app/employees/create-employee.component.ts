import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from '../models/department.model';
import { Employee } from '../models/employee.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { EmployeeService } from './employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  @ViewChild('employeeForm') public createEmployeeForm: NgForm;
  previewPhoto: boolean;
  datePickerConfig: Partial<BsDatepickerConfig>;
  employee: Employee;
  panelTitle: string;
  departments: Department[] = [
    { id: 1, name: 'Help Desk' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'Payroll' }
  ];
  gender = 'male';
  constructor(private _employeeService: EmployeeService,
    private _router: Router,
    private _route: ActivatedRoute) {
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        showWeekNumbers: false,
        minDate: new Date(1908, 0, 1),
        maxDate: new Date(2019, 11, 31),
        dateInputFormat: 'DD/MM/YYYY'
      });
  }

  togglePhotoPreview() {
    if (this.previewPhoto) {
      this.previewPhoto = false;
    } else {
      this.previewPhoto = true;
    }
  }

  ngOnInit() {
    this._route.paramMap.subscribe(parameterMap => {
      const id = +parameterMap.get('id');
      this.getEmployee(id);
    });
  }
  private getEmployee(id: number) {
    if (id === 0) {
      this.panelTitle = 'Create Employee';
      this.employee = {
        id: null,
        name: null,
        gender: null,
        contactPreference: null,
        phoneNumber: null,
        email: '',
        dateOfBirth: null,
        department: 'select',
        isActive: true,
        photoPath: null
      };
      this.createEmployeeForm.reset();
    } else {
      this.panelTitle = 'Edit Employee';
      this._employeeService.getEmployee(id).subscribe(
        (employee) => this.employee = employee,
        (err: any) => console.log(err));
    }
  }

  saveEmployee(): void {
    // const newEmployee: Employee = Object.assign({}, this.employee);
    if (this.employee.id == null) {
      this._employeeService.addEmployee(this.employee).subscribe(
        (data: Employee) => {
          console.log(data);
      this.createEmployeeForm.reset({
        name: 'TestName',
        contactPreference: 'phone'
      });
      this._router.navigate(['list']);
        },
        (error: any) => console.log(error)
      );
    } else {
      this._employeeService.updateEmployee(this.employee).subscribe(
        () => {
      this.createEmployeeForm.reset();
      this._router.navigate(['list']);
        },
        (error: any) => console.log(error)
      );
    }

  }

}
