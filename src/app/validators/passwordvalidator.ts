import { AbstractControl } from '@angular/forms';
export function matchPassword(password: string, confirmPassword: string) {
  return function (formGroup: AbstractControl) {
    const control = formGroup.get(password)?.value;
    const matchingControl = formGroup.get(confirmPassword)?.value;
    if (control === matchingControl) {
      return null;
    }
    else {
      return { passwordMismatch: true };
    }
  }
}