import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit {
  @Input() employee: Employee;
  private selectedEmployeeId: number;
  @Input() searchTerm: string;
  @Output() notifyDelete: EventEmitter<number> = new EventEmitter<number>();
  confirmDelete = false;
  // @Output() notify: EventEmitter<Employee> = new EventEmitter<Employee>();
  // @Input() employeeId: number;
  // private _employee: Employee;
  // @Input()
  // set employee(val: Employee) {
  //   // console.log('Previous : ' + (this._employee ? this._employee.name : 'NULL'));
  //   // console.log('Current : ' + val.name);
  //   this._employee = val;
  // }
  // get employee (): Employee {
  //   return this._employee;
  // }
  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _employeeService: EmployeeService) { }

  ngOnInit() {
   this.selectedEmployeeId = + this._route.snapshot.paramMap.get('id');
  }

  viewEmployee() {
    this._router.navigate(['/employees', this.employee.id], {
      queryParams: {
        'searchTerm': this.searchTerm
      }
    });
  }

  editEmployee() {
    this._router.navigate(['/edit', this.employee.id]);
  }

  deleteEmployee() {
    this._employeeService.deleteEmployee(this.employee.id).subscribe(
    () => console.log(`Employee with id = ${this.employee.id} deleted`),
      (err) => console.log(err)
    );
    this.notifyDelete.emit(this.employee.id);
  }

  // getEmployeeNameAndGender(): string {
  //   return this.employee.name + ' ' + this.employee.gender;
  // }

  // handleClick() {
  //   this.notify.emit(this.employee);
  // }

  // ngOnChanges(changes: SimpleChange) {
  //   const previousEmployee = <Employee>changes.employee.previousValue;
  //   const currentEmployee = <Employee>changes.employee.currentValue;
  //   // console.log('Previous : ' + (previousEmployee ? previousEmployee.name : 'NULL'));
  //   // console.log('Current : ' + currentEmployee.name);

  //   for (const propName of Object.keys(changes)) {
  //     const change = changes[propName];
  //     const from = JSON.stringify(change.previousValue);
  //     const to = JSON.stringify(change.currentValue);
  //     console.log(propName + ' changed from  ' + from + ' to  ' + to);
  //   }
  //  }

}
