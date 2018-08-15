import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export class EmployeeService {
    constructor(private httpClient: HttpClient) {}
    private listEmployees: Employee[] = [
        {
            id: 1,
            name: 'Mark',
            gender: 'male',
            contactPreference: 'email',
            email: 'mark@abc.com',
            dateOfBirth: new Date('10/25/1988'),
            department: '3',
            isActive: true,
            photoPath: 'assets/images/mark.jpg'
        },
        {
            id: 2,
            name: 'Mary',
            gender: 'female',
            contactPreference: 'phone',
            phoneNumber: 9876543210,
            dateOfBirth: new Date('12/25/1979'),
            department: '2',
            isActive: true,
            photoPath: 'assets/images/mary.jpg'
        },
        {
            id: 3,
            name: 'John',
            gender: 'male',
            contactPreference: 'phone',
            phoneNumber: 1234567890,
            dateOfBirth: new Date('3/25/1976'),
            department: '3',
            isActive: false,
            photoPath: 'assets/images/john.png'
        },
    ];

    baseUrl = 'http://localhost:3000/employees';

    getEmployees(): Observable<Employee[]> {
        return this.httpClient.get<Employee[]>(this.baseUrl)
        .pipe(catchError(this.handleError));
        // return Observable.of(this.listEmployees).delay(2000);
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('Client side error: ', errorResponse.error.message);
        } else {
            console.error('Server side error:', errorResponse);
        }
        return new ErrorObservable('There is a problem with the service. We are notified and working on it.');
    }

    getEmployee(id: number): Observable<Employee> {
        return this.httpClient.get<Employee>(`${this.baseUrl}/${id}`)
        .pipe(catchError(this.handleError));
    }

    addEmployee(employee: Employee): Observable<Employee> {
                   return this.httpClient.post<Employee>(this.baseUrl, employee, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
            }).pipe(catchError(this.handleError));
            // const maxid = this.listEmployees.reduce(function (e1, e2) {
            //     return (e1.id > e2.id) ? e1 : e2;
            // }).id;
            // employee.id = maxid + 1;
            // this.listEmployees.push(employee);
    }

    updateEmployee(employee: Employee): Observable<void> {
           return this.httpClient.put<void>(`${this.baseUrl}/${employee.id}`, employee, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
            }).pipe(catchError(this.handleError));
    }

    deleteEmployee(id: number): Observable<void> {
        return this.httpClient.delete<void>(`${this.baseUrl}/${id}`)
        .pipe(catchError(this.handleError));
    }
}
