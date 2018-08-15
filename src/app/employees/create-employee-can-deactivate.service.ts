import { CanDeactivate } from '@angular/router';
import { CreateEmployeeComponent } from './create-employee.component';
import { Injectable } from '@angular/core';

@Injectable()
export class CreateEmployeeCanDeactivateService implements CanDeactivate<CreateEmployeeComponent> {

    constructor() { }

    canDeactivate(component: CreateEmployeeComponent): boolean {
        if (component.createEmployeeForm.dirty) {
            return confirm('Are you sure to discard changes?');
        }
        return true;
    }
}
